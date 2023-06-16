import React, { useCallback, useState } from "react";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import styles from "./styles/tablet.card.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import getLoggedUserData from "../../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/AppReducer/cart/actions";
import { toast } from "react-toastify";
import { AddWishListAction } from "../../redux/AppReducer/wishlist/actions";
const TabletProductCard = ({
  image,
  title,
  brand,
  category,
  ratings,
  discountPrice,
  Stock,
  _id,
}) => {

  const loggedUser = getLoggedUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();


  const [isHeartClicked, setIsHeartClicked] = useState(() => {
    const storedValue = localStorage.getItem(`product_${_id}`);
    return storedValue ? JSON.parse(storedValue) : false;
  });

  const handleProductDetails = useCallback(() => {
    if (!isHeartClicked) {
      navigate(`/product/single/${_id}`);
    }
  }, [isHeartClicked, navigate, _id]);


  const handleHeartClick = useCallback(async () => {
    if (loggedUser && loggedUser.token) {
      const payload = {
        token: loggedUser.token,
        productId: _id,
      };

      try {
        const res = await dispatch(AddWishListAction(payload));
        // console.log("res:-", res);

        if (res === undefined) {
          throw new Error("Something went wrong", { autoClose: 2000 })
        }

        if (res && res === "Product added to wishlist") {
          toast.success("Product added to wish list success", { autoClose: 2000 })
        } else if (res === "Product already exists in wishlist") {
          toast.error(res, { autoClose: 2000 })
        }
        setIsHeartClicked(true);
        localStorage.setItem(`product_${_id}`, JSON.stringify(true));
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 });
      }

    } else {
      toast.error("Please login to add product to wishlist", { autoClose: 2000 });
      navigate("/login", {
        state: { from: location.pathname },
        replace: true,
      });
    }
  }, [dispatch, loggedUser, _id, navigate, location.pathname]);



  // add product to cart
  const AddToCart = async () => {

    if (!loggedUser) {
      toast.error("Please login to add product to cart", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true
        });
      }, 2000);

    } else {
      const payload = {
        quantity: 1,
        productId: _id,
        token: loggedUser.token

      }



      try {
        const res = await dispatch(addToCartAction(payload))
        console.log("res", res);
        if (res === undefined) {
          throw new Error("Something went wrong")
        }
        if (res && res.msg === "product added to cart successs") {
          toast.success("Product added to cart success", { autoClose: 2000 })
          setTimeout(() => {
            navigate("/cart")

          }, 2500)
        } else if (res.msg === "product quantity updated in cart") {
          toast.success("Product quantity updated in cart", { autoClose: 2000 })
          setTimeout(() => {
            navigate("/cart")

          }, 2500)
        }
      } catch (error) {
        toast.error(error.message, { autoClose: 2000 })
      }
    }


  }

  return (
    <div className={styles._tablet_product_card}>
      <div className={styles._tablet_product_image_container} onClick={handleProductDetails} >
        <img src={image} alt={title} className={styles._tablet_product_image} />
      </div>
      <div className={styles._tablet_product_details}>
        <h3 className={styles._tablet_product_name}>{title.substr(0, 20)}</h3>
        <p className={styles._tablet_product_brand}>
          {" "}
          <strong>Brand : -</strong> {brand}
        </p>
        <p className={styles._tablet_product_category}>
          {" "}
          <strong>Category : -</strong> {category}
        </p>

        <div className={styles._tablet_product_rating}>
          {Array(5)
            .fill()
            .map((_, i) => (
              <span
                key={i}
                className={`${styles.star} ${i < Math.floor(ratings) ? styles.star_active : ""
                  }`}
              >
                <FaStar />
              </span>
            ))}
        </div>

        <p className={styles._tablet_product_price}>₹{discountPrice}</p>
        <div className={styles._tablet_icons_container}>

          <button className={`${styles._tablet_icon_button_shop} ${Stock <= 0 ? styles._tablet_icon_button_shop_red_bg : ""
            }`}
            onClick={AddToCart} >
            {Stock <= 0 ? <MdOutlineRemoveShoppingCart
              style={{ color: "white" }} /> :
              <FaShoppingCart />}
          </button>


          <button className={styles._tablet_icon_button_heart} onClick={handleHeartClick} >
            <FaHeart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabletProductCard;
