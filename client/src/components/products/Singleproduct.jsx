import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./styles/details.module.css";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { ReviewModal } from "../../modals/CompleteReview";
import ProductCard from "./ProductCard";
import AddReviewModal from "../../modals/AddReviewModal";
import AllReviewsModal from "../../modals/AllReviews";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import DocumentTitle from "../../components/Helmet/Helmet";
import Loader from "../../components/loader/Loader";
import getLoggedUserData from "../../utils/LoggedUserData";
import { toast } from "react-toastify";
import { getProductDetails } from "../../redux/AppReducer/products/actions";
import { addToCartAction } from "../../redux/AppReducer/cart/actions";

function Singleproduct() {
  const CheckLogin = getLoggedUserData();
  const [recommendedProd, setRecommendPro] = useState([]);
  const { product, isLoading } = useSelector(
    (store) => store.getProductDetailsReducer
  );
  const { products } = useSelector((store) => store.getProductReducer);
  const [hoveredImage, setHoveredImage] = useState(product.image);
  const [modalVisible, setModalVisible] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);
  const [isComponetChnages, setIsComponentChanges] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const Dekstop = ({ children }) => {
    const isDekstop = useMediaQuery({ minWidth: 992 });
    return isDekstop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  const handleAddReviewClick = () => {
    if (!CheckLogin) {
      // console.log("by logged in ::-",CheckLogin,"by register::-",CheckRegister);
      toast.error("Please login to add review");

      // without using setTimout if we use navigate then navigate
      // will  immediately call becuase it is a synchronous function
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }, 2000);
      return;
    }
    setShowAddReviewModal(true);
  };

  const handleAllReviws = () => {
    setShowAllReviewsModal(true);
  };

  function handleImageHover(imageUrl) {
    setHoveredImage(imageUrl);
  }

  const dispatch = useDispatch();
  const { id } = useParams();

  const handleComponentChanges = () => {
    setIsComponentChanges((prevState) => !prevState);
  };

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch, isComponetChnages]);

  useEffect(() => {
    if (product) {
      matchRecommenData();
    }
  }, [product]);

  const matchRecommenData = () => {
    const filterRecom = products.filter(
      (prod) =>
        prod.category === product.category || prod.brand === product.brand
      // prod.title === product.title
    );

    setRecommendPro(filterRecom);
  };

  // console.log("product:-", product, "id", id)

  // add product

  const AddToCart = async () => {
    if (!CheckLogin) {
      toast.error("Please login to add product to cart");
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true,
        });
      }, 2000);
    } else {
      const payload = {
        quantity: 1,
        productId: id,
        token: CheckLogin.token,
      };

      // console.log("cart payload", payload);

      try {
        const res = await dispatch(addToCartAction(payload));

        if (res === undefined) {
          throw new Error("Something went wrong");
        }
        if (res && res.msg === "product added to cart successs") {
          toast.success("Product added to cart success");
          setTimeout(() => {
            navigate("/cart");
          }, 2500);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  // redirect user to checkout page when click Buy now

  const handleCheckoutRedirect = () => {
    if (!CheckLogin) {
      toast.error("Please login to add product to cart");
      setTimeout(() => {
        navigate("/login", {
          state: { from: location.pathname },
          replace: true
        });
      }, 2000);

    }else{
      navigate(`/checkout/buyNow/${id}`)
    }
  }





  if (isLoading) {
    return <Loader />;
  }

  // console.log("product.Stock", product && product.Stock);
  return (
    <>

      <DocumentTitle pageTitle="| PRODUCT | DETAILS" />
      <Dekstop>
        <div className={styles._main_single_container}>
          <div className={styles._main_single_images}>
            <div className={styles._main_single_column}>
              {product?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  onMouseEnter={() => handleImageHover(image)}
                />
              ))}
            </div>

            <div className={styles._main_single_img}>
              <img
                src={hoveredImage ? hoveredImage : product && product.image}
                alt={`product-${product.title}`}
                style={{ borderRadius: "5px" }}
              />

              {product.Stock <= 0 ? (
                <div>
                  <button
                    className={styles.buyButton}
                    style={{ cursor: "not-allowed" }}
                  >
                    {" "}
                    Out of stock{" "}
                  </button>
                </div>
              ) : (
                <div className={styles._main_single_buttons}>
                  <button
                    className={styles.buyButton}
                    onClick={handleCheckoutRedirect}
                  >
                    Buy Now
                    <TiShoppingCart
                      style={{ paddingLeft: "10px", fontSize: "30px" }}
                    />
                  </button>
                  <button className={styles.cartButton} onClick={AddToCart}>
                    Add to Cart
                    <FaShoppingCart
                      style={{ paddingLeft: "10px", fontSize: "30px" }}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className={styles._main_single_details}>
            <h2>{product && product.title}</h2>

            <div className={styles._main_single_reviews}>
              <button>
                {product && (
                  <span style={{ fontSize: "17px" }}>{product.ratings} </span>
                )}
                <FaStar style={{ paddingLeft: "5px", fontSize: "20px" }} />
              </button>
              <p>
                {product && product.reviews && product.reviews.length
                  ? product.reviews.length
                  : 0}{" "}
                Reviews
              </p>
            </div>

            <div className={styles._main_single_price}>
              <p className={styles.discountPrice}>
                ₹ {product && product.discountPrice}
              </p>
              <p className={styles.originalPrice}>
                ₹ {product && product.originalPrice}
              </p>
            </div>

            <div className={styles._main_single_stock_cate_bran}>
              <p>
                <span>Availability </span> :
                {product && product.Stock > 0
                  ? `In Stock (${product.Stock})`
                  : "Out of Stock"}
              </p>
              <p>
                <span>Category </span> : {product && product.category}
              </p>
              <p>
                <span>Brand </span> : {product && product.brand}
              </p>
            </div>

            <div className={styles._main_single_description}>
              <span>Description : </span>
              <p>{product && product.description}</p>
            </div>

            <hr />

            <div className={styles._main_single_reviews_container}>
              {product && product.reviews && product.reviews.length === 0 ? (
                <h1 className={styles._main_single_no_reviews}>No Review</h1>
              ) : (
                <>
                  {product &&
                    product.reviews &&
                    product.reviews.length > 0 &&
                    product.reviews
                      .slice(0, Math.min(2, product.reviews.length))
                      .map((rev) => (
                        <div
                          key={rev._id}
                          className={styles._main_single_reviewer}
                        >
                          <div className={styles._main_single_rating_name}>
                            <button
                              className={
                                styles._main_single_buttons_reviwes_given
                              }
                            >
                              {product && (
                                <span style={{ fontSize: "17px" }}>
                                  {rev.rating}{" "}
                                </span>
                              )}
                              <FaStar
                                style={{ paddingLeft: "5px", fontSize: "20px" }}
                              />
                            </button>
                            <p className={styles._main_single_rater_name}>
                              {rev.name}
                            </p>
                          </div>
                          <div className={styles._main_single_comment}>
                            <p className={styles._main_single_com}>
                              {rev.comment.length > 300
                                ? `${rev.comment.substring(0, 300)}.`
                                : rev.comment}
                              {rev.comment.length > 300 && (
                                <button
                                  onClick={() => setModalVisible(true)}
                                  className={styles._main_single_see_more}
                                  onClose={() => setModalVisible(false)}
                                >
                                  See more
                                </button>
                              )}
                            </p>
                          </div>
                        </div>
                      ))}
                </>
              )}
            </div>

            {modalVisible && (
              <ReviewModal
                content={
                  product.reviews.find((rev) => rev.comment.length > 300)
                    .comment
                }
                onClose={() => setModalVisible(false)}
              />
            )}

            <div className={styles._main_single_add_review}>
              {product && product.reviews && product.reviews.length > 2 && (
                <button
                  className={styles._main_single_add_review_see_all}
                  onClick={handleAllReviws}
                >
                  SEE ALL REVIEWS
                </button>
              )}
              <button
                className={styles._main_single_add_review_btn}
                onClick={handleAddReviewClick}
              >
                ADD REVIEW
              </button>
              {showAddReviewModal && (
                <AddReviewModal
                  onCloseModal={() => setShowAddReviewModal(false)}
                  onComponentChanges={handleComponentChanges}
                />
              )}
            </div>
          </div>
        </div>

        {showAllReviewsModal && (
          <AllReviewsModal
            reviews={product.reviews}
            onCloseModal={() => setShowAllReviewsModal(false)}
          />
        )}

        <div className={styles._main_single_recommendations}>
          <h3>Recommended Products</h3>
          {recommendedProd.length === 0 ? (
            <h1>Recommended Product Not Available</h1>
          ) : (
            <div className={styles._main_single_recommend_products}>
              {recommendedProd.map((el) => (
                <ProductCard key={el._id} {...el} />
              ))}
            </div>
          )}
        </div>
      </Dekstop>

      <Tablet>
        <div className={styles._main_single_images}>
          <div className={styles._main_single_column}>
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                onMouseEnter={() => handleImageHover(image)}
              />
            ))}
          </div>

          <div className={styles._main_single_img}>
            <img
              src={hoveredImage ? hoveredImage : product && product.image}
              alt={`product-${product.title}`}
              style={{ borderRadius: "5px" }}
            />

            {product.Stock <= 0 ? (
              <div>
                <button
                  className={styles.buyButton}
                  style={{ cursor: "not-allowed" }}
                >
                  {" "}
                  Out of stock{" "}
                </button>
              </div>
            ) : (
              <div className={styles._main_single_buttons}>
                <button
                  className={styles.buyButton}
                  onClick={handleCheckoutRedirect}
                >
                  Buy Now
                  <TiShoppingCart
                    style={{ paddingLeft: "10px", fontSize: "30px" }}
                  />
                </button>
                <button className={styles.cartButton} onClick={AddToCart}>
                  Add to Cart
                  <FaShoppingCart
                    style={{ paddingLeft: "10px", fontSize: "30px" }}
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={styles._tablet_single_details}>
          <h2>{product && product.title}</h2>

          <div className={styles._main_single_reviews}>
            <button>
              {product && (
                <span style={{ fontSize: "17px" }}>{product.ratings} </span>
              )}
              <FaStar style={{ paddingLeft: "5px", fontSize: "20px" }} />
            </button>
            <p>
              {product && product.reviews && product.reviews.length
                ? product.reviews.length
                : 0}{" "}
              Reviews
            </p>
          </div>

          <div className={styles._main_single_price}>
            <p className={styles.discountPrice}>
              ₹ {product && product.discountPrice}
            </p>
            <p className={styles.originalPrice}>
              ₹ {product && product.originalPrice}
            </p>
          </div>

          <div className={styles._main_single_stock_cate_bran}>
            <p>
              <span>Availability </span> :
              {product && product.Stock > 0
                ? `In Stock (${product.Stock})`
                : "Out of Stock"}
            </p>
            <p>
              <span>Category </span> : {product && product.category}
            </p>
            <p>
              <span>Brand </span> : {product && product.brand}
            </p>
          </div>

          <div className={styles._main_single_description}>
            <span>Description : </span>
            <p>{product && product.description}</p>
          </div>

          <hr />

          {/* <div className={styles._main_single_reviews_container}>
            {product && product.reviews.length === 0 ? (
              <h1 className={styles._main_single_no_reviews}>No Reviews</h1>
            ) : (
              <>
                {product.reviews.slice(0, 2).map((rev) => (
                  <div key={rev._id} className={styles._main_single_reviewer}>
                    <div className={styles._main_single_rating_name}>
                      <button
                        className={styles._main_single_buttons_reviwes_given}
                      >
                        {product && (
                          <span style={{ fontSize: "17px" }}>
                            {rev.rating}
                          </span>
                        )}
                        <FaStar
                          style={{ paddingLeft: "5px", fontSize: "20px" }}
                        />
                      </button>
                      <p className={styles._main_single_rater_name}>
                        {rev.name}
                      </p>
                    </div>
                    <div className={styles._main_single_comment}>
                      <p className={styles._main_single_com}>
                        {rev.comment.length > 300
                          ? `${rev.comment.substring(0, 300)}.`
                          : rev.comment}
                        {rev.comment.length > 300 && (
                          <button
                            onClick={() => setModalVisible(true)}
                            className={styles._main_single_see_more}
                            onClose={() => setModalVisible(false)}
                          >
                            See more
                          </button>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div> */}

          <div className={styles._main_single_reviews_container}>
            {product && product.reviews && product.reviews.length === 0 ? (
              <h1 className={styles._main_single_no_reviews}>No Review</h1>
            ) : (
              <>
                {product &&
                  product.reviews &&
                  product.reviews.length > 0 &&
                  product.reviews
                    .slice(0, Math.min(2, product.reviews.length))
                    .map((rev) => (
                      <div
                        key={rev._id}
                        className={styles._main_single_reviewer}
                      >
                        <div className={styles._main_single_rating_name}>
                          <button
                            className={
                              styles._main_single_buttons_reviwes_given
                            }
                          >
                            {product && (
                              <span style={{ fontSize: "17px" }}>
                                {rev.rating}{" "}
                              </span>
                            )}
                            <FaStar
                              style={{ paddingLeft: "5px", fontSize: "20px" }}
                            />
                          </button>
                          <p className={styles._main_single_rater_name}>
                            {rev.name}
                          </p>
                        </div>
                        <div className={styles._main_single_comment}>
                          <p className={styles._main_single_com}>
                            {rev.comment.length > 300
                              ? `${rev.comment.substring(0, 300)}.`
                              : rev.comment}
                            {rev.comment.length > 300 && (
                              <button
                                onClick={() => setModalVisible(true)}
                                className={styles._main_single_see_more}
                                onClose={() => setModalVisible(false)}
                              >
                                See more
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>

          {modalVisible && (
            <ReviewModal
              content={
                product.reviews.find((rev) => rev.comment.length > 300).comment
              }
              onClose={() => setModalVisible(false)}
            />
          )}

          <div className={styles._main_single_add_review}>
            {product && product.reviews && product.reviews.length > 2 && (
              <button
                className={styles._main_single_add_review_see_all}
                onClick={handleAllReviws}
              >
                SEE ALL REVIEWS
              </button>
            )}
            <button
              className={styles._main_single_add_review_btn}
              onClick={handleAddReviewClick}
            >
              ADD REVIEW
            </button>
            {showAddReviewModal && (
              <AddReviewModal
                onCloseModal={() => setShowAddReviewModal(false)}
              />
            )}
          </div>
        </div>

        {showAllReviewsModal && (
          <AllReviewsModal
            reviews={product.reviews}
            onCloseModal={() => setShowAllReviewsModal(false)}
          />
        )}

        <div className={styles._main_single_recommendations}>
          <h3>Recommended Products</h3>
          {recommendedProd.length === 0 ? (
            <h1>Recommended Product Not Available</h1>
          ) : (
            <div className={styles._main_single_recommend_products}>
              {recommendedProd.map((el) => (
                <ProductCard key={el._id} {...el} />
              ))}
            </div>
          )}
        </div>
      </Tablet>

      <Mobile>
        <div className={styles._mobile_single_img}>
          <img
            src={hoveredImage}
            alt={`product-${product.title}`}
            style={{ borderRadius: "5px" }}
          />
        </div>
        <div className={styles._mobile_single_images}>
          <div className={styles._mobile_single_column}>
            {product?.images?.map((image, index) => (
              <img
                key={index}
                src={hoveredImage ? hoveredImage : product && product.image}
                alt={`Product ${index + 1}`}
                onMouseEnter={() => handleImageHover(image)}
              />
            ))}
          </div>
        </div>
        {product.Stock <= 0 ? (
          <div>
            <button
              className={styles.buyButton}
              style={{ cursor: "not-allowed" }}
            >
              {" "}
              Out of stock{" "}
            </button>
          </div>
        ) : (
          <div className={styles._main_single_buttons}>
            <button
              className={styles.buyButton}
              onClick={handleCheckoutRedirect}
            >
              Buy Now
              <TiShoppingCart
                style={{ paddingLeft: "10px", fontSize: "30px" }}
              />
            </button>
            <button className={styles.cartButton} onClick={AddToCart}>
              Add to Cart
              <FaShoppingCart
                style={{ paddingLeft: "10px", fontSize: "30px" }}
              />
            </button>
          </div>
        )}

        <hr />

        <div className={styles._tablet_single_details}>
          <h2>{product && product.title}</h2>

          <div className={styles._main_single_reviews}>
            <button>
              {product && (
                <span style={{ fontSize: "17px" }}>{product.ratings} </span>
              )}
              <FaStar style={{ paddingLeft: "5px", fontSize: "20px" }} />
            </button>
            <p>
              {product && product.reviews && product.reviews.length
                ? product.reviews.length
                : 0}{" "}
              Reviews
            </p>
          </div>

          <div className={styles._main_single_price}>
            <p className={styles.discountPrice}>
              ₹ {product && product.discountPrice}
            </p>
            <p className={styles.originalPrice}>
              ₹ {product && product.originalPrice}
            </p>
          </div>

          <div className={styles._main_single_stock_cate_bran}>
            <p>
              <span>Availability </span> :
              {product && product.Stock > 0
                ? `In Stock (${product.Stock})`
                : "Out of Stock"}
            </p>
            <p>
              <span>Category </span> : {product && product.category}
            </p>
            <p>
              <span>Brand </span> : {product && product.brand}
            </p>
          </div>

          <div className={styles._main_single_description}>
            <span>Description : </span>
            <p>{product && product.description}</p>
          </div>

          <hr />

          <div className={styles._main_single_reviews_container}>
            {product && product.reviews && product.reviews.length === 0 ? (
              <h1 className={styles._main_single_no_reviews}>No Review</h1>
            ) : (
              <>
                {product &&
                  product.reviews &&
                  product.reviews.length > 0 &&
                  product.reviews
                    .slice(0, Math.min(2, product.reviews.length))
                    .map((rev) => (
                      <div
                        key={rev._id}
                        className={styles._main_single_reviewer}
                      >
                        <div className={styles._main_single_rating_name}>
                          <button
                            className={
                              styles._main_single_buttons_reviwes_given
                            }
                          >
                            {product && (
                              <span style={{ fontSize: "17px" }}>
                                {rev.rating}{" "}
                              </span>
                            )}
                            <FaStar
                              style={{ paddingLeft: "5px", fontSize: "20px" }}
                            />
                          </button>
                          <p className={styles._main_single_rater_name}>
                            {rev.name}
                          </p>
                        </div>
                        <div className={styles._main_single_comment}>
                          <p className={styles._main_single_com}>
                            {rev.comment.length > 300
                              ? `${rev.comment.substring(0, 300)}.`
                              : rev.comment}
                            {rev.comment.length > 300 && (
                              <button
                                onClick={() => setModalVisible(true)}
                                className={styles._main_single_see_more}
                                onClose={() => setModalVisible(false)}
                              >
                                See more
                              </button>
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>

          {modalVisible && (
            <ReviewModal
              content={
                product.reviews.find((rev) => rev.comment.length > 300).comment
              }
              onClose={() => setModalVisible(false)}
            />
          )}

          <div
            className={`${styles._main_single_add_review} ${styles._mobile_single_add_review}`}
          >
            {product && product.reviews && product.reviews.length > 2 && (
              <button
                className={styles._main_single_add_review_see_all}
                onClick={handleAllReviws}
              >
                SEE ALL REVIEWS
              </button>
            )}
            <button
              className={styles._main_single_add_review_btn}
              onClick={handleAddReviewClick}
            >
              ADD REVIEW
            </button>
            {showAddReviewModal && (
              <AddReviewModal
                onCloseModal={() => setShowAddReviewModal(false)}
              />
            )}
          </div>
        </div>

        {showAllReviewsModal && (
          <AllReviewsModal
            reviews={product.reviews}
            onCloseModal={() => setShowAllReviewsModal(false)}
          />
        )}

        <div className={styles._main_single_recommendations}>
          <h3>Recommended Products</h3>
          {recommendedProd.length === 0 ? (
            <h1>Recommended Product Not Available</h1>
          ) : (
            <div className={styles._main_single_recommend_products}>
              {recommendedProd.map((el) => (
                <ProductCard key={el._id} {...el} />
              ))}
            </div>
          )}
        </div>
      </Mobile>
    </>
  );
}

export default Singleproduct;
