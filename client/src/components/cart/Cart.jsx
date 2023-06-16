import React, { useEffect, useState } from "react";
import styles from "./styles/cart.module.css";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import getLoggedUserData from "../../utils/LoggedUserData";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DocumentTitle from "../Helmet/Helmet";
import {
  getCartData,
  removerAllCartAction,
} from "../../redux/AppReducer/cart/actions";

const Cart = () => {
  const loggedUser = getLoggedUserData();
  const { response, isLoading } = useSelector(
    (store) => store.getCartDataReducer
  );
  const [isComponentChange, setIsComponentChange] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleComponetChangeUpdate = () => {
    setIsComponentChange(!isComponentChange);
  };

  const handleClearAllCart = async () => {
    let confirm = window.confirm(
      "Are you sure want to remove all product(s) from the cart"
    );

    if (confirm) {
      try {
        let res = await dispatch(removerAllCartAction(loggedUser.token));

        if (res === undefined) {
          throw new Error("Something went wrong");
        } else if (res && res.hint === "reAlSuc") {
          toast.success("All Cart Data Removed Success");
          setTimeout(() => {
            handleComponetChangeUpdate();
          }, 2500);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    dispatch(getCartData(loggedUser.token));
  }, [dispatch, loggedUser.token, isComponentChange]);

  if (isLoading) {
    return <Loader />;
  }



  return (
    <>
      <DocumentTitle pageTitle="| CART" />
      <section>
        <div className={styles._cart_container}>
          <h2>Shopping Cart</h2>
          <div className={styles._cart_continue}>
            <Link to="/products">&larr; Continue shopping</Link>
          </div>
          {response?.cartItems?.length === 0 ||
          (response && response.msg === "No cart data found for this user") ? (
            <>
              <div className={styles.__empty__cart__message}>
                <p>Your cart is currently empty.</p>
                <img
                  src="./emptycart.avif"
                  alt="No cart data found for this user"
                />
              </div>
            </>
          ) : (
            response?.cartItems && (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Id</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {response?.cartItems?.map((item, ind) => (
                      <CartItem
                        key={item.product._id}
                        {...item.product}
                        ind={ind}
                        handleComponetChange={handleComponetChangeUpdate}
                        quantity={item.quantity}
                      />
                    ))}
                  </tbody>
                </table>
                <div className={styles._cart_summary}>
                  <button
                    className={styles._cart_clear_cart}
                    onClick={handleClearAllCart}
                  >
                    Clear Cart
                  </button>
                  <div className={styles._cart_checkout}>
                    <p>
                      Total Items:{" "}
                      <strong>{response?.cartItems?.length}</strong>
                    </p>
                    <p className={styles._cart_sub_total}>
                      Subtotal: <span> ₹ {response?.totalPrice}</span>
                    </p>
                    <p>Tax will be calculated at order time</p>
                    <button
                      className={styles._cart_checkout_btn}
                      onClick={() => navigate("/checkout")}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </>
            )
          )}
        </div>
      </section>
    </>
  );
};

export default Cart;
