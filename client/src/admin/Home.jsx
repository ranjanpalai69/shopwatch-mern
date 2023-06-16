import React, { useEffect, useState } from 'react'
import styles from "./styles/home.module.css"
import { AiOutlineLogin, AiOutlineStock, AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BiMessageAltDots } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { BsBoxFill } from "react-icons/bs";
import Dashboard from './Dashboard';
import Products from './Products';
import Stock from './Stock';
import Message from './Message';
import Setting from './Setting';
import DocumentTitle from '../components/Helmet/Helmet';
import { LogoutActionCreator } from '../redux/AuthReducer/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const [activeComponent, setActiveComponent] = useState("dashboard")
  const storeProperties = useSelector(store => store.loginReducer)
  
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const showActiveComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Dashboard />

      case "products":
        return <Products />

      case "stock":
        return <Stock />

      case "message":
        return <Message />

      case "setting":
        return <Setting />

      default: return null;
    }
  }


  const onLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      dispatch(LogoutActionCreator())
    }
  };


  useEffect(() => {
    if (storeProperties?.message) {
      toast.success(storeProperties.message, { autoClose: 1500 });
      storeProperties.message = null;
      navigate("/")
    }
  }, [dispatch, storeProperties, storeProperties?.message, navigate]);


  return (
    <>
      <DocumentTitle pageTitle={" ADMIN "} />
      <div className={styles.__admin__home} >

        {/* sidebar */}
        <div className={styles.__admin__sidebar}>
          <div className={styles.__admin__logoDetails}>
            <div className={styles.__admin_head} >
              <AiOutlineUser />
              <span className={styles.__admin__logoName}>Ranjan Palai</span>
            </div>
          </div>
          <ul className={styles.__admin__navLinks}>
            <div className={styles.__admin_tab_link}>
              <div className={activeComponent === "dashboard" ?`${styles.activeTab}` : ""} onClick={() => setActiveComponent("dashboard")}>
                <li>
                  <RxDashboard />
                  <span className={styles.__admin__linksName}>Dashboard</span>
                </li>
              </div>

              <div className={activeComponent === "products" ?`${styles.activeTab}` : ""} onClick={() => setActiveComponent("products")}>
                <li>
                  <BsBoxFill />
                  <span className={styles.__admin__linksName}>Product</span>
                </li>
              </div>

              <div className={activeComponent === "stock" ?`${styles.activeTab}` : ""} onClick={() => setActiveComponent("stock")}>
                <li>
                  <AiOutlineStock />
                  <span className={styles.__admin__linksName}>Out Of Stock</span>
                </li>
              </div>

              <div className={activeComponent === "message" ?`${styles.activeTab}` : ""} onClick={() => setActiveComponent("message")}>
                <li>
                  <BiMessageAltDots />
                  <span className={styles.__admin__linksName}>Messages</span>
                </li>
              </div>

              <div className={activeComponent === "setting" ?`${styles.activeTab}` : ""} onClick={() => setActiveComponent("setting")}>
                <li>
                  <AiOutlineSetting />
                  <span className={styles.__admin__linksName}>Setting</span>
                </li>
              </div>

              <div>
                <li className={styles.__admin__logOut}>
                  <AiOutlineLogin />
                  <span className={styles.__admin__linksName} onClick={onLogout} >Log out</span>
                </li>
              </div>
            </div>
          </ul>
        </div>

        {/* main content */}
        <div className={styles.__admin__home__right_content} >
          {showActiveComponent()}
        </div>
      </div>
    </>
  )
}

export default Home
