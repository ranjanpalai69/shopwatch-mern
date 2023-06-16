import React from 'react'
import styles from "./footer.module.css"
import { AiFillLinkedin, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai"

import { useMediaQuery } from 'react-responsive';
function Footer() {

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


  return (
    <>
      {/* Default screen */}
      <Desktop>
        <footer className={styles._footer_distributed}>
          <div className={styles._footer_left}>
            <h3>
              RANJAN <span> PALAI</span>
            </h3>
            <ul>
              <li> Full Stack Developer</li>
              <li>Odisha (Banpur)</li>
              <li>Gmail :- palairanjan2002@gmail.com</li>
              <li>Phone :- 8144630220 </li>

            </ul>

            <div className={styles._footer_icons}>
              <a href="/signup">
                <AiFillLinkedin />
              </a>
              <a href="/signup">
                <AiFillTwitterCircle />
              </a>
              <a href="/signup">
                <AiFillYoutube />
              </a>
            </div>

          </div>

          <div className={styles._footer_center}>

            <h3>
              Company
            </h3>
            <ul>
              <li>shopwatch.com</li>
              <li>Online e-Ecommerce</li>
              <li>24/7 available</li>

            </ul>

            <div className={styles._footer_icons}>
              <a href="/signup">
                <AiFillLinkedin />
              </a>
              <a href="/signup">
                <AiFillTwitterCircle />
              </a>
              <a href="/signup">
                <AiFillYoutube />
              </a>
            </div>
          </div>

          <div className={styles._footer_right}>

            <h3>
              About Website
            </h3>
            <p>
              shopwatch is a online e-Eommerce website through which user can
              buy various types of watches as their requirements.
            </p>


            <div className={styles._footer_icons}>
              <a href="/signup">
                <AiFillLinkedin />
              </a>
              <a href="/signup">
                <AiFillTwitterCircle />
              </a>
              <a href="/signup">
                <AiFillYoutube />
              </a>
            </div>
          </div>

        </footer>

        <h1 className={styles.copywrght}>{new Date().getFullYear()} &copy; copyright by Ranjan Palai</h1>
      </Desktop>

      {/* Tablet */}

      <Tablet>
        <footer className={styles._tablet_footer_distributed}>
          <div className={styles._tablet_footer}>
            <div>
              <h3>
                Ranjan <span> Palai</span>
              </h3>
              <ul>
                <li>Full Stack Developer</li>
                <li>Odisha (Banpur)</li>
                <li>Phone : 8144630220 </li>

              </ul>
            </div>

            <div className={styles._tablet_footer_mid}>

              <h3>
                Company
              </h3>
              <ul>
                <li>shopwatch.com</li>
                <li>Online e-Ecommerce</li>
                <li>24/7 available</li>

              </ul>
            </div>
          </div>



          <div className={styles._tablet_footer_center}>

            <h3>
              About Website
            </h3>

            <p>
              shopwatch is a online e-Eommerce website through which user can
              buy various types of watches as their requirements.
            </p>



            <div className={styles._tablet_footer_icons}>
              <a href="/signup">
                <AiFillLinkedin />
              </a>
              <a href="/signup">
                <AiFillTwitterCircle />
              </a>
              <a href="/signup">
                <AiFillYoutube />
              </a>
            </div>
          </div>
        </footer>
        <h1 className={styles.copywrghtMid} >{new Date().getFullYear()} &copy; copyright by Ranjan Palai</h1>
      </Tablet>

      {/* Mobile */}

      <Mobile>
        <footer className={styles._mobile_footer_distributed}>
          <div className={styles._mobile_footer_left}>
            <h3>
              Ranjan<span>Palai</span>
            </h3>
            <ul>
              <li>Full Stack Developer</li>
              <li>Odisha (Banpur)</li>
              <li>Phone : 8144630220 </li>

            </ul>
          </div>

          <div className={styles._mobile_footer_center}>

            <h3>
              Company
            </h3>
            <ul>
              <li>shopwatch.com</li>
              <li>Online e-Ecommerce</li>
              <li>24/7 available</li>

            </ul>
          </div>

          <div className={styles._mobile_footer_right}>

            <h3>
              About Website
            </h3>

            <p>
              shopwatch is a online e-Eommerce website through which user can
              buy various types of watches as their requirements.
            </p>

            <div className={styles._mobile_footer_icons}>
              <a href="/signup">
                <AiFillLinkedin />
              </a>
              <a href="/signup">
                <AiFillTwitterCircle />
              </a>
              <a href="/signup">
                <AiFillYoutube />
              </a>
            </div>
          </div>
        </footer>
      </Mobile>
    </>
  )
}

export default Footer
