import React, { useState } from "react";
import DocumentTitle from "../components/Helmet/Helmet";
import "./userSideBar.css";

// importing icon
import { CgProfile } from "react-icons/cg";
import { AiFillShopping, AiFillHeart } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import ProfileDetails from "./ProfileDetails";
import ChangePassword from "../components/authentication/ChangePassword";
import getLoggedUserData from "../utils/LoggedUserData";
import Wishlist from "../components/products/Wishlist";
import Orders from "../components/checkoutAndOrder/Orders/Orders";

function UserProfile() {
  const [active, setActive] = useState("profile");
  const LoggedUser = getLoggedUserData();

  const renderComponent = () => {
    switch (active) {
      case "profile": {
        return <ProfileDetails />;
      }

      case "Password": {
        return <ChangePassword />;
      }

      case "Whishlist": {
        return <Wishlist />;
      }

      case "order": {
        return <Orders />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <>
      <DocumentTitle pageTitle="| MY PROFILE" />
      {/* sidebar  */}
      <div className="main__user__profile__section">
        <div className="user_sidebar_main">
          <div className="img_profile_div">
            <img className="user_profile_img" src={LoggedUser.avator} alt="" />
          </div>
          <h1>Hi, {LoggedUser.name.split(" ")[0]}</h1>
          <div className="small_profile_design">
            <div
              className={active === "profile" ? "active" : ""}
              onClick={() => setActive("profile")}
            >
              <CgProfile className="user__icon__size" /> Profile
            </div>
            <div
              className={active === "order" ? "active" : ""}
              onClick={() => setActive("order")}
            >
              <AiFillShopping className="user__icon__size" />
              Order
            </div>
            <div
              className={active === "Whishlist" ? "active" : ""}
              onClick={() => setActive("Whishlist")}
            >
              <AiFillHeart className="user__icon__size" />
              Whishlist
            </div>
            <div
              className={active === "Password" ? "active" : ""}
              onClick={() => setActive("Password")}
            >
              <RiLockPasswordFill className="user__icon__size" />
              Change Password
            </div>
            <div
              className={active === "Log" ? "active" : ""}
              onClick={() => setActive("Log")}
            >
              <FiLogOut className="user__icon__size" />
              Log Out
            </div>
          </div>
        </div>
        <div className="each_user_component">{renderComponent()}</div>
      </div>
    </>
  );
}

export default UserProfile;
