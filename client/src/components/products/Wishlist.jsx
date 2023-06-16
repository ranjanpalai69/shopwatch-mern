import React, { useEffect, useState } from "react";
import DocumentTitle from "../Helmet/Helmet";
import { useDispatch, useSelector } from "react-redux";
import { GetWishListAction } from "../../redux/AppReducer/wishlist/actions";
import getLoggedUserData from "../../utils/LoggedUserData";
import Loader from "../loader/Loader";
import styles from "./styles/wishlist.module.css";
import EmptyWishlist from "./EmptyWishlist";
import WishlistCard from "./WishlistCard";

function Wishlist() {
  const [timer, setTimer] = useState(true);
  const loggedUser = getLoggedUserData();
  const dispatch = useDispatch();
  const { isError, data } = useSelector((store) => store.wishlistReducer);

  useEffect(() => {
    const payload = {
      token: loggedUser.token,
    };
    dispatch(GetWishListAction(payload));
  }, [dispatch, loggedUser.token]);

  useEffect(() => {
    setTimeout(() => {
      setTimer(false);
    }, 2000);
  }, []);

  if (timer) {
    return <Loader />;
  }

  // if (isError) {
  //   if (isError === "Wishlist not found") {
  //     return <EmptyWishlist />
  //   }
  // }'

  // console.log("isError::-", isError);
  // console.log("data::-", data);

  if (isError) {
    if (isError === "Failed to fetch" || isError === "Server error") {
      return <h1 style={{ textAlign: "center" }}>Something went wrong</h1>;
    }
  }

  if (!data || data.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <>
      <DocumentTitle pageTitle={"| MY WISHLIST"} />
      <div className={styles.__top__}>
        <h2>My Wishlist</h2>

        <p>Click on image to see details</p>
      </div>
      <div className={styles.__parent_container}>
        {data?.length > 0 &&
          data?.map((el) => {
            return <WishlistCard key={el._id} {...el} />;
          })}
      </div>
    </>
  );
}

export default Wishlist;
