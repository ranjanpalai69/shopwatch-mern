import React, { useEffect, useState } from "react";
import DocumentTitle from "../../Helmet/Helmet";
import styles from "./styles/orders.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetOrderAction } from "../../../redux/AppReducer/orders/actions";
import getLoggedUserData from "../../../utils/LoggedUserData";
import Loader from "../../loader/Loader";
import ExpiredToken from "../../authentication/ExpiredToken";
import NoOrderFound from "./NoOrderFound";

function Orders() {
  const [timer, setTimer] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const LoggedUser = getLoggedUserData();
  const { isError,orders } = useSelector(
    (store) => store.OrdersReducer
  );
  // const storeData= useSelector(
  //   (store) => store.OrdersReducer
  // );

  useEffect(() => {
    dispatch(GetOrderAction({ token: LoggedUser.token }));
  }, [dispatch, LoggedUser.token]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, []);

  if (timer) {
    return <Loader />;
  }

  if (isError) {
    // console.log("isError:",isError);
    if (isError.message === "Token expired") {
      return <ExpiredToken loginMess={"Login"} />;
    } else if (isError.msg === "No order data found for this user") {
      return <NoOrderFound />;
    } else {
      return (
        <h1 style={{ textAlign: "center" }}>
          Something went wrong. Please contact us
        </h1>
      );
    }
  }

  // console.log("orderId from strore :", orderId);
  // console.log("this is orders from store", orders);
  // console.log("complete store data for orders:", storeData);

  return (
    <>
      <DocumentTitle pageTitle={"| MY ORDERS"} />

      <div className={styles.__orders__header}>
        <h2>My Orders</h2>
        <p>Click on orderId to see details of the order </p>
      </div>

      <table className={styles.__orders__table}>
        <thead>
          <tr>
            <th>S/n</th>
            <th>Product</th>
            <th>OrderID</th>
            <th>Status</th>
           
          </tr>
        </thead>

        <tbody className={styles.__orders_table__body}>
         {orders?.map((el,index)=>(
          <tr key={el._id} >
             <td>{index + 1}</td>
              <td>
                <img src={el.products[0].productId.image} alt={el._id} />
              </td>

              <td
                onClick={() =>
                  navigate(
                    `/orders/details/orderId/${el._id}`
                  )
                }
              >
              {el._id}
              </td>
             
              <td> {el.orderStatus} </td>
              
          </tr>
         ))}
        </tbody>
      </table>
    </>
  );
}

export default Orders;