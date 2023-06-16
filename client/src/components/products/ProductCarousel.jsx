import React, { useEffect } from "react";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

import "./styles/ProductCarousel.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductsData } from "../../redux/AppReducer/products/actions";


const ProductCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 768, min: 425 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 320, min: 0 },
      items: 1.5,
    },
  };

  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(
    (store) => store.getProductReducer
  );

  const store = useSelector((store) => store);
  // console.log(store, "store");

  // console.log(products, "products");
  // console.log(isLoading, "isLoading");

  useEffect(() => {
    dispatch(getProductsData());
  }, [dispatch]);

  const product = products?.map((item, ind) => (
    <Link
      to={`/product/single/${item._id}`}
      key={ind}
      className="__each__link__"
    >
      <div className="__each__Product__">
        <div className="__each__imgage__">
          <img src={item.image} alt="product" />
        </div>
        <p className="__each__name__">{item.title}</p>
        <div className="__each__price_and_seemore__">
          <p className="__each__price__">
            <span>₹ {item.discountPrice}</span>
          </p>
          <button>See more</button>
        </div>
      </div>
    </Link>
  ));

  if (isLoading) {
    return (
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "25px",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          Loading...
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="__outer_div_carousel__">
          <Carousel
            responsive={responsive}
            autoPlay={true}
            infinite={true}
            itemClass="carousel-item-padding-40-px"
          >
            {product}
          </Carousel>
        </div>
      </div>
    );
  }
};

export default ProductCarousel;
