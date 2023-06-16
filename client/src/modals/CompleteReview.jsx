import { useEffect, useRef, useState } from "react";
import style from "./reviewModal.module.css"
import useOnClickOutsideModal from "../hooks/useOnClickOutsideModal";
export function ReviewModal(props) {
    // console.log("prop::", props)
    const [isOpen, setIsOpen] = useState(false);
    const modalRef = useRef(null);


    useOnClickOutsideModal(modalRef, props.onClose, isOpen);

    useEffect(() => {
        setIsOpen(true);
    }, []);


    return (
        <div className={style._reviw_modal}  >
            <div ref={modalRef}>
                <p>{props.content}</p>
                <button onClick={props.onClose}>&times;</button>
            </div>
        </div>
    );
}