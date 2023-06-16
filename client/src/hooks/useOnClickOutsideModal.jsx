import { useEffect } from "react";

function useOnClickOutsideModal(ref, onCloseModal, isOpen) {
  
  useEffect(() => {
    const handleClickOutsideModal = (event) => {
        // console.log("ref:-",ref.current);
      if (ref.current && !ref.current.contains(event.target) && isOpen) {
        onCloseModal();
      }
    };

    document.addEventListener("click", handleClickOutsideModal);

    return () => {
      document.removeEventListener("click", handleClickOutsideModal);
    };
  }, [isOpen, onCloseModal, ref]);
}

export default useOnClickOutsideModal;

