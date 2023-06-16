import React, { useEffect, useRef } from "react";
import styles from "./filterModal.module.css";

const FilterModal = (props) => {
  const {
    onClose,
    selectedPriceRange,
    setSelectedPriceRange,
    priceRanges,
    handleRatingChange,
    selectedRating,
    ratingOption,
  } = props;
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
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
      <div className={styles.modal_content} ref={modalRef}>
        <button onClick={onClose} className={styles.close_button}>
          &times;
        </button>

        {/* price  */}
        <div className={styles._tablet_price_div}>
          <label
            className={`${styles._tablet_label_text} ${styles._tablet__label_text_price}`}
          >
            Choose price range ::
          </label>
          <select
            value={selectedPriceRange}
            className={styles._tablet__select__priceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
          >
            <option value="" disabled>
              -- Select price range --
            </option>
            {priceRanges.slice(1).map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* price end  */}

        {/* star start  */}

        <div className={styles._tablet_rating_div}>
          <label>Choose rating :: </label>
          <select onChange={handleRatingChange} value={selectedRating}>
            <option value="" disabled>
              Ratings
            </option>
            {ratingOption.map((rate, index) => (
              <option key={index} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>

        {/* star ends   */}
      </div>
    </div>
  );
};

export default FilterModal;
