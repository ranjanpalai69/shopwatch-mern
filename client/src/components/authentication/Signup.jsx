import React, { useEffect, useState } from 'react';
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { BiUserCircle } from 'react-icons/bi';
import { ImMobile } from 'react-icons/im';
import styles from "./styles/authentication.module.css"
import { useDispatch } from 'react-redux';
import { initialMessages, signupIntialState } from '../../objects/Objects';
import ErrorShowModal from '../../modals/ErrorShowModal';
import { SignupActionObj } from '../../redux/AuthReducer/actions';
import DocumentTitle from '../Helmet/Helmet';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { validateInputValue } from '../../Validation/validateInput';

const sendData = {
  title: "Email Validation Failed",
  buttonText: "Try Again",
}


const Signup = () => {
  const [state, setState] = useState(signupIntialState)
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showMessage, setShowMessage] = useState(initialMessages);
  const [emailSave, SetEmailSave] = useState("")

  const [validation, setValidation] = useState({
    name: false,
    email: false,
    password: false,
    mobile: false
  });


  const location = useLocation();
  const commingFrom = location.state?.from || "/"
  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  const navigation = useNavigate()

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const dispatch = useDispatch()
  const isFormValid = () => {
    const formValid =
      validation.name !== false &&
      validation.email !== false &&
      validation.password !== false &&
      validation.mobile !== false
    return formValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value })
    validateInputValue(name, value, validation, setValidation, showMessage, setShowMessage)
  }

  useEffect(() => {
    if (showMessage && showMessage.success) {
      toast.success(showMessage.success,{autoClose:1500})
      setTimeout(() => {
        navigation(commingFrom, { replace: true });
      }, 2500)
    }
  }, [showMessage, navigation, commingFrom]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {

      const payload = {
        name: state.firstname + " " + state.lastname,
        email: state.email,
        password: state.password,
        mobile: +state.mobile,
        avator: state.avator ? state.avator : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyu8pvIy6jXwRi9VluYbqkKBjhiM_YlZIGww&usqp=CAU"
      }

      // console.log("payload::From Compoent",payload);
      const res = await dispatch(SignupActionObj(payload));
      // console.log("response ::-", res)

      if (res === undefined) {
        throw new Error("Something went wrong")
      }
      SetEmailSave(state.email);
      setShowMessage(initialMessages);
      if (res && res.message === "Register successful") {
        setShowMessage({ success: "Registration successful" });
        setState(signupIntialState);
      } else if (res.hint === "em1") {
        SetEmailSave({ emailExits: `This email : ${state.email} already exists` });
        setState(signupIntialState);
      }
    } catch (err) {
      // console.log("err::-", err);
      toast.error(err.message,{autoClose:1500});
      setState(signupIntialState);
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

  // console.log("isForm validate from component :", isFormValid())

  return (
    <>

      <DocumentTitle pageTitle="| SIGNUP" />
      {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Signup form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Signup Form</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit}>
                  <div className={`${styles.row} ${styles.clearfix}`}>
                    <div className={styles.col_half}>
                      <div className={styles.input_field}>
                        <span><FaUser /></span>
                        <input type="text" name="firstname" placeholder="First Name"
                          value={state.firstname}
                          onChange={handleChange} />

                      </div>
                    </div>
                    <div className={styles.col_half}>
                      <div className={styles.input_field}>
                        <span><FaUser /></span>
                        <input type="text" name="lastname"
                          placeholder="Last Name"
                          value={state.lastname}
                          onChange={handleChange} />
                      </div>
                    </div>
                    {showMessage && <p className={styles._show_indcator}>{showMessage.name}</p>}
                  </div>
                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email" name="email"
                      placeholder="Email"
                      value={state.email}
                      onChange={handleChange} />
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.email}</p>}
                  <div className={styles.input_field}>
                    {/* <span><FaLock /></span> */}
                    <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password"
                      value={state.password}
                      onChange={handleChange} />
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>
                  {showMessage && <p className={styles._show_indcator}>{showMessage.password}</p>}

                  <div className={styles.input_field}>
                    {/* <span><FaLock /></span> */}
                    <input type="number" name="mobile" placeholder='Enter mobile number'
                      value={state.mobile}
                      onChange={handleChange} />

                    <span> <ImMobile /></span>
                  </div>
                  {showMessage && <p className={styles._show_indcator} >{showMessage.mobile}</p>}
                  <div className={styles.input_field}>
                    <span><BiUserCircle /></span>
                    <input type="url" name="avator" placeholder="Paste your photo link"
                      value={state.avator}
                      onChange={handleChange} />
                  </div>


                  <input className={styles.button}
                    value="Register"
                    type="submit"
                    disabled={!isFormValid()}
                    style={{ cursor: !isFormValid() ? "not-allowed" : "pointer" }} />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default Signup;
