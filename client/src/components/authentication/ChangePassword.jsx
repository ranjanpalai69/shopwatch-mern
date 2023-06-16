import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

import styles from "./styles/authentication.module.css"
import DocumentTitle from '../Helmet/Helmet';

import { changePasswordInitialState } from '../../objects/Objects';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { ChangePasswordAction } from '../../redux/AuthReducer/actions';
import { CHANGE_PASSWORD_REQUEST_FAILUE, CHANGE_PASSWORD_REQUEST_SUCESS } from '../../Constant/actionTypes';
import { validateInputValue } from '../../Validation/validateInput';


const ChangePassword = () => {
  const [state, setState] = useState(changePasswordInitialState);
  const [showMessage, setShowMessage] = useState(changePasswordInitialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formLoading, SetFormLoading] = useState(true)
  const { isLoading, isError, response } = useSelector(store => store.ChangePasswordReducer)
  const [validation, setValidation] = useState({
    email: false,
    currentPassword: false,
    newPassword: false
  });

  const dispatch = useDispatch()
  setTimeout(() => {
    SetFormLoading(false)
  }, 1500)



  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isFormValid = () => {
    const formValid =
      validation.email !== false &&
      validation.currentPassword !== false &&
      validation.newPassword !== false
    return formValid;
  };


  if (response) {
    if (response === "Password updated successfully") {
      toast.success(response, { autoClose: 1500 })
      dispatch({ type: CHANGE_PASSWORD_REQUEST_SUCESS, payload: null })
      setState(changePasswordInitialState)
    }
  }

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
    validateInputValue(name, value, validation, setValidation, showMessage, setShowMessage)


  };



  // handling form submit

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const payload = {
      email: state.email,
      password: state.currentPassword,
      newPassword: state.newPassword
    }

    dispatch(ChangePasswordAction(payload))
  }

  if (isError) {
    // console.log("isError:", isError);
    if (isError === "User not found") {
      toast.error(isError, { autoClose: 1500 });
      dispatch({ type: CHANGE_PASSWORD_REQUEST_FAILUE, payload: null })
      setState(changePasswordInitialState)

    } else if (isError === "Invalid old password") {
      toast.error(isError, { autoClose: 1500 });
      dispatch({ type: CHANGE_PASSWORD_REQUEST_FAILUE, payload: null })
      setState(changePasswordInitialState)

    } else {
      toast.error("Something went wrong", { autoClose: 1500 })
      dispatch({ type: CHANGE_PASSWORD_REQUEST_FAILUE, payload: null })
      setState(changePasswordInitialState)
    }

  }

  if (response) {
    if (response === "Password updated successfully") {
      toast.success(response, { autoClose: 1500 })
      dispatch({ type: CHANGE_PASSWORD_REQUEST_SUCESS, payload: null })
      setState(changePasswordInitialState)
    }
  }

  // console.log("isFormValid from component of changePassword:", isFormValid());
  // console.log("showMessage:", showMessage);

  return (
    <>
      <DocumentTitle pageTitle={"| CHANGE PASSWORD"} />

      {formLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Change password form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Change Password</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit} >

                  <div className={styles.input_field}>
                    <span><FaEnvelope /></span>
                    <input type="email"
                      name="email" placeholder="Email"
                      onChange={handleInputChange}
                      value={state.email}
                    />
                  </div>

                  {showMessage && <p className={styles._show_indcator} >{showMessage.email}</p>}

                  <div className={styles.input_field}>
                    <input type={showPassword ? 'text' : 'password'}
                      name="currentPassword" placeholder="Current password"
                      onChange={handleInputChange}
                      value={state.currentPassword}
                    />
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>


                 
                  {showMessage && <p className={styles._show_indcator} >{showMessage.currentPassword}</p>}


                  <div className={styles.input_field}>
                    <input type={showConfirmPassword ? 'text' : 'password'}
                      name="newPassword"
                      placeholder="New password"
                      onChange={handleInputChange}
                      value={state.newPassword}
                    />
                    <span onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>


                  {showMessage && <p className={styles._show_indcator} >{showMessage.newPassword}</p>}

                  <input className={styles.button}
                    type="submit"
                    disabled={!isFormValid()}
                    style={{ cursor: !isFormValid() ? "not-allowed" : "pointer" }}
                    value={isLoading ? "Fetching..." : "Change Password"} />

                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
