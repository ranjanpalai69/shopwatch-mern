import React from 'react';
import { MdBuild } from 'react-icons/md';
import styles from "./styles/under.module.css"

function UnderConstruction() {
  return (
    <div className={styles.__admin__under_cons}>
      <MdBuild size="3rem" className={styles.__admin__under_cons__icon} />
      <h2 className={styles.__admin__under_h2} >This page is under construction</h2>
      <p className={styles.__admin__under_p}>Please check back later for updates.</p>
    </div>
  );
}

export default UnderConstruction;
