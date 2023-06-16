import React, { useEffect, useRef } from "react";
import styles from "./filterModal.module.css";
import stylesTablet from ".././components/products/styles/products.tablet.module.css";

const MobileFilterModal = (props) => {
  const {
    onClose,
    categoryOption,
    handleCategoryChange,
    brandOption,
    handleBrandChange,
  } = props;
  const modalMoRef = useRef();

  const handleClickOutside = (event) => {
    if (modalMoRef.current && !modalMoRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={modalMoRef}>
        <button onClick={onClose} className={styles.close_button}>
          &times;
        </button>

        <div className={stylesTablet._tablet_category_div}>
          <label className={stylesTablet._tablet_label_text}>
            Select Category ::{" "}
          </label>
          {categoryOption.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`category-${index}`}
                value={item.cate}
                checked={item.checked}
                onChange={(event) => handleCategoryChange(event, index)}
              />
              <label htmlFor={`category-${index}`}>{item.cate}</label>
            </div>
          ))}
        </div>
        <hr />
        <div className={styles._tablet_brand_div}>
          <label className={styles._tablet_label_text}>Select Brand :: </label>
          {brandOption.map((item, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`brand-${index}`}
                value={item.brand}
                checked={item.checked}
                onChange={(event) => handleBrandChange(event, index)}
              />
              <label htmlFor={`brand-${index}`}>{item.brand}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileFilterModal;
