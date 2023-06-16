import React, { useEffect } from "react";
import styles from "./styles/confirm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loadPaymentOption } from "../../../utils/PaymentOption";
import { AddOrderAction } from "../../../redux/AppReducer/orders/actions";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import getLoggedUserData from "../../../utils/LoggedUserData";
import { getCartData } from "../../../redux/AppReducer/cart/actions";
import { getProductDetails } from "../../../redux/AppReducer/products/actions";

function Confirm() {
  const { productId } = useParams();
  const logedUser = getLoggedUserData();
  let paymentOption = loadPaymentOption();
  const dispatch = useDispatch();
  const { response } = useSelector((store) => store.getCartDataReducer);
  const { deliveryAddress } = useSelector((state) => state.AddressReducer);
  const { product } = useSelector((store) => store.getProductDetailsReducer);
  const deliveryAddressId =
    localStorage.getItem("deliveryAddressId").replace(/"/g, "") || "";

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCartData());
    if (productId) {
      dispatch(getProductDetails(productId));
    }
  }, [dispatch, productId]);

  const requestBody = {
    products: productId
      ? [{ productId: productId }]
      : response.cartItems.map((item) => ({
          productId: item.product._id,
        })),
    paymentMethod: paymentOption,
    deliveryAddressId: deliveryAddressId,
    token: logedUser.token,
  };
  // console.log("response", response);
  // console.log("requestBody for order::-", requestBody);

  const handleConfirmOrder = async () => {
    try {
      let res = await dispatch(AddOrderAction(requestBody));

      if (res === undefined) {
        toast.error("Something went wrong");
      }

      if (res && res.hint === "orSucc") {
        toast.success(res.message, { autoClose: 1500 });

        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      } else if (res.hint === "orderExist") {
        toast.error(res.message, { autoClose: 1500 });

        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 1500 });
    }
  };

  return (
    <>
      <div className={styles.__checkout__confirm_}>
        <p>Confirm your order</p>
        <table>
          <tbody>
            <tr>
              <th>Delivery Address :</th>
              <td>State :</td>
              <td>
                <span>{deliveryAddress.state}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Dist:</td>
              <td>
                <span>{deliveryAddress.city}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Block:</td>
              <td>
                <span>{deliveryAddress.block}</span>
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Vill:</td>
              <td>
                <span>{deliveryAddress.address}</span>
              </td>
            </tr>

            <tr>
              <th>Payment Method :</th>
              <td></td>
              <td>
                <span>
                  {paymentOption
                    .replace(/([A-Z])/g, " $1")
                    .toLowerCase()
                    .replace(/^\w|\s\w/g, (c) => c.toUpperCase())}
                </span>
              </td>
            </tr>
            <tr>
              <th>Total Amount :</th>
              <td></td>
              <td>
                <span>
                  ₹
                  {productId
                    ? product.discountPrice + 45
                    : response && response?.totalPrice + 45}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={handleConfirmOrder}>Confirm Order</button>
      </div>
    </>
  );
}

export default Confirm;
