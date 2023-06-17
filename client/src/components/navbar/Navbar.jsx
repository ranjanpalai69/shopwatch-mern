import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineShoppingCart,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import { BsBagCheck } from "react-icons/bs";
import {
  SiAdminer,
  SiMicrosoftaccess,
  SiGnuprivacyguard,
} from "react-icons/si";
import { GrList } from "react-icons/gr";
import { AiOutlineLogin } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { RiLogoutCircleLine } from "react-icons/ri";
import styles from "./navbar.module.css";
import { useMediaQuery } from "react-responsive";
import SearchInput from "../../home/SearchInput";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import getLoggedUserData, { loadUser } from "../../utils/LoggedUserData";
import { getCartData } from "../../redux/AppReducer/cart/actions";
import { LogoutActionCreator } from "../../redux/AuthReducer/actions";



function Navbar() {
  const LoggedUser = getLoggedUserData();
  const reGisterUer = loadUser();
  const [showRightSide, setShowRightSide] = useState(false);

  const { response } = useSelector((store) => store.getCartDataReducer);
  const storeProperties = useSelector(store => store.loginReducer)

  const navigate = useNavigate()
  const dispatch = useDispatch();


  // responsive start for
  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    return isTablet ? children : null;
  };
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    return isMobile ? children : null;
  };

  // responsive end

  const onLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      dispatch(LogoutActionCreator())
    }
  };


  useEffect(() => {
    dispatch(getCartData());
    if (storeProperties?.message) {
      toast.success(storeProperties.message, { autoClose: 1500 });
      // set message to null after displaying else it will show again and again since
      // message properties will not get null
      storeProperties.message = null;
      navigate("/")
    }
  }, [dispatch, storeProperties, storeProperties?.message, navigate]);



  return (
    <>
      <Desktop>
        {/* for default */}
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1 onClick={() => navigate("/")}>ShopWatch..</h1>
          </div>
          <div className={styles.search}>
            <SearchInput />
          </div>
          <div className={styles._rightSide}>
            {(LoggedUser && LoggedUser.role) ||
              (reGisterUer && reGisterUer.message) ? (
              <>
                <button
                  onClick={() => navigate("/about")}
                  style={{
                    fontSize: "17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    margin: "0 5px",
                    width: "200px",
                  }}
                >

                  <FcAbout /> About Us
                </button>
                <button
                  onClick={onLogout}
                  style={{
                    fontSize: "17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    margin: "0 5px",
                  }}
                >

                  <RiLogoutCircleLine />
                  Logout
                </button>
                <div className={styles.more}>
                  {/* <CgMenuRound style={{
                    fontSize: "35px",
                    color: "#fca311"
                  }} /> */}

                  <img
                    src={
                      (LoggedUser && LoggedUser.avator) ||
                      (reGisterUer && reGisterUer.avator)
                    }
                    alt={
                      (LoggedUser && LoggedUser.name) ||
                      (reGisterUer && reGisterUer.role)
                    }
                    className={styles._navbar_avator_}
                  />
                  <div className={styles.dropdown}>
                    <Link to="/profile">
                      <ImProfile
                        style={{ marginRight: "10px", color: "white" }}
                      />
                      My Profile
                    </Link>
                    <Link to="/wishlist">
                      <GrList style={{ marginRight: "10px", color: "white" }} />
                      Wishlist
                    </Link>
                    <Link to="/orders">
                      <BsBagCheck
                        style={{ marginRight: "10px", color: "white" }}
                      />
                      Orders
                    </Link>
                    {(LoggedUser && LoggedUser.role === "admin") ||
                      (reGisterUer && reGisterUer.role === "admin") ? (
                      <Link to="/admin">
                        <SiAdminer
                          style={{ marginRight: "10px", color: "white" }}
                        />
                        Admin
                      </Link>
                    ) : (LoggedUser && LoggedUser.role === "user") ||
                      (reGisterUer && reGisterUer.role === "user") ? null : (
                      <Link to="/superAdmin">
                        <SiMicrosoftaccess
                          style={{ marginRight: "10px", color: "white" }}
                        />
                        SuperAdmin
                      </Link>
                    )}
                  </div>
                </div>

                <div className={styles.cartIcon}>
                  <Link to="/cart">
                    <AiOutlineShoppingCart fontSize={"27px"} />
                    {response && response?.totalProducts > 0 ? (
                      <span>{response.totalProducts}</span>
                    ) : (
                      <span>0</span>
                    )}
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <button
                    onClick={() => navigate("/about")}
                    style={{
                      fontSize: "19px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      margin: "0 5px",
                    }}
                  >
                    <FcAbout />
                    About Us
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    style={{
                      fontSize: "19px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      margin: "0 5px",
                    }}
                  >
                    <AiOutlineLogin />
                    Sign in
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    style={{
                      fontSize: "19px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                      margin: "0 5px",
                    }}
                  >
                    <SiGnuprivacyguard />
                    Sign up
                  </button>
                </div>
              </>
            )}
          </div>
        </nav>
      </Desktop>

      {/* for tablet screen */}

      <Tablet>
        <nav className={styles._tablet_navbar}>
          <div className={styles._tablet_logo}>
            <h1 onClick={() => navigate("/")}>ShopWatch..</h1>
          </div>
          <div className={styles._tablet_search}>
            <SearchInput />
          </div>

          <div
            className={`${styles._tablet_rightSide} ${showRightSide ? "showRightSide" : ""
              }`}
          >
            <div
              className={styles.hamburgerIcon}
              onClick={() => setShowRightSide(!showRightSide)}
            >
              {showRightSide ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            {showRightSide && (
              <div className={styles._tablet_rightSidebar}>
                {(LoggedUser && LoggedUser.role) ||
                  (reGisterUer && reGisterUer.message) ? (
                  <>
                    <ul>
                      <li>
                        <a href="/profile">
                          <ImProfile style={{ marginRight: "10px" }} />
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <GrList style={{ marginRight: "10px" }} />
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <AiOutlineShoppingCart
                            style={{ marginRight: "10px", fontSize: "25px" }}
                          />
                          {response && response?.totalProducts > 0 ? (
                            <span>{response.totalProducts}</span>
                          ) : (
                            <span>0</span>
                          )}
                        </a>
                      </li>
                      <li>
                        <a href="/profile">
                          <BsBagCheck style={{ marginRight: "10px" }} />
                          Orders
                        </a>
                      </li>
                      {(LoggedUser && LoggedUser.role === "admin") ||
                        (reGisterUer && reGisterUer.role === "admin") ? (
                        <li>
                          <a href="/admin">
                            <SiAdminer style={{ marginRight: "10px" }} />
                            Admin
                          </a>
                        </li>
                      ) : (LoggedUser && LoggedUser.role === "user") ||
                        (reGisterUer && reGisterUer.role === "user") ? null : (
                        <li>
                          <a href="/superAdmin">
                            <SiMicrosoftaccess
                              style={{ marginRight: "10px" }}
                            />
                            SuperAdmin
                          </a>
                        </li>
                      )}

                      <li onClick={onLogout} style={{
                        fontSize: "23px",
                        marginLeft: "30px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid white",
                        paddingBottom: "5px",
                        color: 'white'
                      }}>
                        <RiLogoutCircleLine style={{ marginRight: "10px" }} />
                        Logout
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <a
                          href="/about"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <FcAbout /> About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/login"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <AiOutlineLogin />
                          Signin
                        </a>
                      </li>
                      <li>
                        <a
                          href="/signup"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <SiGnuprivacyguard /> Signup
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </Tablet>

      {/* for mobile */}

      <Mobile>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <h1 onClick={() => navigate("/")}>
              Shop<span>Watch..</span>
            </h1>
          </div>

          <div
            className={`${styles._tablet_rightSide} ${showRightSide ? "showRightSide" : ""
              }`}
          >
            <div
              className={styles.hamburgerIcon}
              onClick={() => setShowRightSide(!showRightSide)}
            >
              {showRightSide ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            {showRightSide && (
              <div className={styles._tablet_rightSidebar}>
                {(LoggedUser && LoggedUser.role) ||
                  (reGisterUer && reGisterUer.message) ? (
                  <>
                    <ul>
                      <li>
                        <a href="/profile">
                          <ImProfile style={{ marginRight: "10px" }} />
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a href="/wishlist">
                          <GrList style={{ marginRight: "10px" }} />
                          Wishlist
                        </a>
                      </li>
                      <li>
                        <a href="/cart">
                          <AiOutlineShoppingCart
                            style={{ marginRight: "10px", fontSize: "25px" }}
                          />
                          {response && response?.totalProducts > 0 ? (
                            <span>{response.totalProducts}</span>
                          ) : (
                            <span>0</span>
                          )}
                        </a>
                      </li>
                      <li>
                        <a href="/orders">
                          <BsBagCheck style={{ marginRight: "10px" }} />
                          Orders
                        </a>
                      </li>

                      {(LoggedUser && LoggedUser.role === "admin") ||
                        (reGisterUer && reGisterUer.role === "admin") ? (
                        <li>
                          <a href="/admin">
                            <SiAdminer style={{ marginRight: "10px" }} />
                            Admin
                          </a>
                        </li>
                      ) : (LoggedUser && LoggedUser.role === "user") ||
                        (reGisterUer && reGisterUer.role === "user") ? null : (
                        <li>
                          <a href="/superAdmin">
                            <SiMicrosoftaccess
                              style={{ marginRight: "10px" }}
                            />
                            SuperAdmin
                          </a>
                        </li>
                      )}

                      <li onClick={onLogout} style={{
                        fontSize: "23px",
                        marginLeft: "30px",
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid white",
                        paddingBottom: "5px",
                        color: 'white'
                      }}>
                        <RiLogoutCircleLine style={{ marginRight: "10px" }} />
                        Logout
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <ul>
                      <li>
                        <a
                          href="/about"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <FcAbout /> About Us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/login"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <AiOutlineLogin />
                          Signin
                        </a>
                      </li>
                      <li>
                        <a
                          href="/signup"
                          style={{
                            gap: "8px",
                            margin: "0 5px",
                          }}
                        >

                          <SiGnuprivacyguard /> Signup
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </Mobile>
    </>
  );
}

export default Navbar;