import React, { useRef, useEffect } from 'react';
import styles from "./Errorshow.modal.module.css"

function ErrorShowModal({ show, title, content, buttonText, onClose }) {
  // console.log("show modal::-",show)
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
       <div style={{ display: show ? 'block' : 'none' }}>
      <div className={styles._error_show_modal_overlay}>
        <div ref={modalRef} className={styles._error_show_modal_div}>
          <h2 className={styles._error_show_modal_title}>{title}</h2>
          <hr className={styles._error_show_modal_divider} />
          <p className={styles._error_show_modal_content}>{content}</p>
          <button className={styles._error_show_modal_button} onClick={onClose}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

export default ErrorShowModal;
