import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import styles from "./styles/authentication.module.css"
import { ForgetPassActionObj } from '../../redux/AuthReducer/actions';
import { toast } from 'react-toastify';
import { initialMessages } from '../../objects/Objects';
import DocumentTitle from '../Helmet/Helmet';
import ErrorShowModal from '../../modals/ErrorShowModal';


const sendData = {
  title: "Not Found",
  buttonText: "Try Again",
}
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|mil|info|biz)$/i;
  return emailRegex.test(email);
}

const ForgetPassword = () => {
  const [isFormLoading, setIsLoading] = useState(true);
  const [email, setMail] = useState("")
  const { isLoading } = useSelector(store => store.forgetPasswordReducer)
  const [showMessage, setShowMessage] = useState(initialMessages);
  const [showModal, setShowModal] = useState(true);
  const [emailSave, SetEmailSave] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);



  const handleForm = async (e) => {
    e.preventDefault()
    let isValiMain = isValidEmail(email)
    if (!isValiMain) {
      setShowMessage({ ...showMessage, invalid: "Please provide a valid email address" });
    } else {
      setShowMessage("");

      try {
        let res = await dispatch(ForgetPassActionObj(email))

        SetEmailSave(email);
        if (res === undefined) {
          throw new Error("Something went wrong")

        }

        else if (res && res.hint === "send") {
          toast.success(`Email sent sucess to : ${email}. Check mail`)
          setMail("");
        }
        else if (res && res.hint === "not") {
          SetEmailSave({ emailExits: `This email : ${email} is not found` });
          setMail("");
        }
        console.log("response::", res);
      } catch (error) {
        toast.error(error.message);
        setTimeout(() => {
          navigate("/");
        }, 2500);

      }

    }


  }

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload()
  };

  if (emailSave && emailSave.emailExits) {
    return (
      <ErrorShowModal
        {...sendData}
        content={`${emailSave.emailExits}`}
        onClose={handleCloseModal}
        show={showModal}
      />
    );
  }



  return (

    <>


      <DocumentTitle pageTitle="| FORGET PASSWORD" />
      {isFormLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Forget Password form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Forget Password</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleForm} >

                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email"
                      name="email"
                      placeholder="Enter your registerd email"
                      onChange={(e) => setMail(e.target.value)}
                      required />
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.invalid}</p>}
                  <input className={styles.button} type="submit" value={isLoading ? "Checking..." : "Submit"} />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ForgetPassword;

