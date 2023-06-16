import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from "./styles/authentication.module.css"
import { useDispatch } from 'react-redux';
import ErrorShowModal from '../../modals/ErrorShowModal';
import DocumentTitle from '../Helmet/Helmet';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialMessages, loginInitialState } from '../../objects/Objects';
import { SigninActionObj } from '../../redux/AuthReducer/actions';
import { validateInputValue } from '../../Validation/validateInput';


const sendData = {
  title: "Login Failed",
  buttonText: "Try Again",
}


const Login = () => {
  const [state, setState] = useState(loginInitialState)
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const commingFrom = location.state?.from || "/"
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(initialMessages);

  const [validation, setValidation] = useState({
    email: false,
    password: false,
  });

  const [emailSave, SetEmailSave] = useState("")
  const dispatch = useDispatch()

  const isFormValid = () => {
    const formValid =
      validation.email !== false &&
      validation.password !== false
    return formValid;
  };

  const Passhanlde = (name, value) => {
    validateInputValue(name, value, validation, setValidation, showMessage, setShowMessage)
  }

  useEffect(() => {
    if (showMessage && showMessage.success) {
      toast.success(showMessage.success,{autoClose:1500})
      setShowMessage({ ...showMessage, success: "" });
      setTimeout(() => {
        navigate(commingFrom, { replace: true });
      }, 2500)
    }
  }, [showMessage, navigate, commingFrom]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try { 
      // console.log("state data:-",state);
      const res = await dispatch(SigninActionObj(state));

      if (res === undefined) {
        throw new Error("Something went wrong")
      }
      SetEmailSave(state.email);
      setShowMessage(initialMessages);

      if (res && res.messssage === "Login Successful") {
        setShowMessage({ success: "Login successful" });
        setState(loginInitialState);
      } else if (res.hint === "wrong") {
        setShowMessage({ ...initialMessages, invalid: "Wrong Passwprd" })
        setState(loginInitialState);
      } else if (res.hint === "paenot") {
        SetEmailSave({ emailExits: `This email : ${state.email} is not found` });
        setState(loginInitialState);
      }
    } catch (err) {
      toast.error(err.message,{autoClose:1500});
      setState(loginInitialState);
    }
  };

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


  if (showMessage && showMessage.invalid) {
    toast.error(showMessage.invalid,{autoClose:1500})
    setShowMessage({ ...showMessage, invalid: "" })
    // navigation("/login")
  }

  // console.log("state from component", state, "isFormValid:", isFormValid());


  return (
    <>

      <DocumentTitle pageTitle="| LOGIN" />
      {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Signin form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Signin Form</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit}>

                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email" name="email"
                      placeholder="Email"
                      value={state.email}
                      onChange={(e) => {
                        const emailValue = e.target.value;
                        setState({ ...state, email: emailValue });
                        Passhanlde("email", emailValue);
                      }}
                    />
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.email}</p>}
                  <div className={styles.input_field}>
                    {/* <span><FaLock /></span> */}
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
                      value={state.password}
                      onChange={(e) => {
                        const passWordValue = e.target.value;
                        setState({ ...state, password: passWordValue });
                        Passhanlde("password", passWordValue);
                      }
                      }
                    />
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.password}</p>}
                  <input className={styles.button}
                    value="Login"
                    type="submit"
                    disabled={!isFormValid()}
                    style={{ cursor: !isFormValid() ? "not-allowed" : "pointer" }} />
                </form>
              </div>
            </div>
          </div>

          <p>Forget Password ? <span onClick={() => navigate("/forgetPassword")} className={styles.__forgot__password__link} >Click here 👉</span> </p>
        </div>
      )}

    </>
  );
};

export default Login;
