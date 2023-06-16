import React from "react";
import styles from "./allreviews.module.css";
import { FaStar } from "react-icons/fa";

const AllReviewsModal = ({ reviews, onCloseModal }) => {
  // console.log("reviews:-",reviews);

  return (
    <div className={styles.all_reviews_modal_container}>
      <div className={styles.all_reviews_modal_header}>
        <h2>All Reviews</h2>
        <button onClick={onCloseModal}>&times;</button>
      </div>
      <div className={styles.all_reviews_modal_body}>
        {reviews.map((review, index) => (
          <div key={index} className={styles.all_reviews_modal_review}>
            <h3>{review.name}</h3>
            <button className={styles.all_reviews_modal_body_rating_div}>
              <span style={{ fontSize: "17px" }}>{review.rating} </span>
              <FaStar style={{ paddingLeft: "5px", fontSize: "20px" }} />
            </button>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviewsModal;
