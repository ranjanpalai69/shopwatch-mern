import React from 'react';

import styles from "./Loader.module.css"
function Loader() {
  return (
    <>

      <div className={styles._main_loader_container}>
        
      <div className={styles.loader_container}>
        loading...
        <div className={`${styles.loader_sector} ${styles.loader_sector_red}`}></div>
        <div className={`${styles.loader_sector} ${styles.loader_sector_blue}`}></div>
        <div className={`${styles.loader_sector} ${styles.loader_sector_green}`}></div>
      </div>
      </div>
    </>
  );
}

export default Loader;
