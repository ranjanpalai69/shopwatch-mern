
import { useState, useRef, useEffect } from "react";
import styles from "./reviewAdd.module.css";
import useOnClickOutsideModal from "../hooks/useOnClickOutsideModal";
import { useParams } from "react-router-dom";
import getLoggedUserData from "../utils/LoggedUserData";
import { useDispatch } from "react-redux";
import { addReviewAction } from "../redux/AppReducer/products/actions";
import { toast } from 'react-toastify';

function AddReviewModal({ onCloseModal, onComponentChanges }) {
  // console.log("  onComponentChanges:-", onComponentChanges);
  const CheckLogin = getLoggedUserData()
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);
  const { id } = useParams()
  const dispatch = useDispatch()

  const handleSubmitReview = async () => {
    if (comment.trim() === "" || rating === 0) {
      alert("Please enter both rating and review comment");
      return;
    }

    const payload = {
      rating: rating,
      comment: comment,
      productId: id,
      token: CheckLogin.token
    };

    setIsLoading(true);
    setError(null);

    try {
      let res = await dispatch(addReviewAction(payload));
      // console.log("component response:-", res)
    
      if (res && res.message === "Review Added") {
        toast.success(res.message)
        setTimeout(()=>{
          onComponentChanges()
        },1000)
      } else if (res.message === "Review updated") {
        toast.success(res.message)
        setTimeout(()=>{
          onComponentChanges()
        },1000)
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    }

    setIsLoading(false);
    onCloseModal();
  };

  useOnClickOutsideModal(modalRef, onCloseModal, isOpen);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  if (isLoading) {
    return (
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <>

  
      <div className={styles._main_single_add_review_modal_main_top_container}>
        <div className={styles._main_single_add_review_modal} ref={modalRef}>
          <div
            className={styles._main_single_add_review_modal_close}
            onClick={onCloseModal}
          >
            &times;
          </div>
          <textarea
            placeholder="Enter your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className={styles._main_single_add_review_rating}>
            {[...Array(5)].map((_, index) => (
              <span key={index} onClick={() => setRating(index + 1)}>
                {rating >= index + 1 ? "★" : "☆"}
              </span>
            ))}
          </div>
          <button onClick={handleSubmitReview}>Submit</button>
        </div>
      </div>
    </>
  );
}

export default AddReviewModal;
