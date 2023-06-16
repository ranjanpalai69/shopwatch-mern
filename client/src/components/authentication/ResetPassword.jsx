import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ExpiredToken from './ExpiredToken';
import { intitialStateForget } from '../../objects/Objects';
import { useDispatch, useSelector } from "react-redux"
import { ResetPassActionObj } from '../../redux/AuthReducer/actions';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import DocumentTitle from '../Helmet/Helmet';
import styles from "./styles/authentication.module.css"
import { RESET_PASSWORD_REQUEST_SUCESS } from '../../Constant/actionTypes';
import { validateInputValue } from '../../Validation/validateInput';
function ResetPassword() {

  const [state, setState] = useState(intitialStateForget)
  const [showMessage, setShowMessage] = useState(intitialStateForget)
  const [isLoading, setIsloading] = useState(true)
  const { token } = useParams();
  const dispatch = useDispatch()
  const { response, isError } = useSelector(store => store.resetPasswordReducer)

  const [validation, setValidation] = useState({
    resetPassword: false,
    resetPasswordConfirmPassword: false,
  });

  const Navigate = useNavigate()
  setTimeout(() => {
    setIsloading(false);
  }, 2000);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };


  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  };

  const isFormValid = () => {
    const formValid =
      validation.resetPassword !== false &&
      validation.resetPasswordConfirmPassword !== false
    return formValid;
  };

  const onChangeHandle = (e) => {
    const { name, value } = e.target;
    // console.log("name:",name,"value:",value);
    setState((prevState) => ({ ...prevState, [name]: value }));
    validateInputValue(name, value, validation, setValidation, showMessage, setShowMessage,state)
  };



  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      newPassword: state.resetPassword,
      token
    }
    dispatch(ResetPassActionObj(payload))



  };

  // console.log("response::-",response,"isError::-",isError);

  if (isError && isError) {
    return <ExpiredToken />
  }

  if (response && response.message === "Password reset successful") {
    toast.success(response.message, { autoClose: 1500 })
    dispatch({ type: RESET_PASSWORD_REQUEST_SUCESS, payload: null })
    setTimeout(() => {
      Navigate("/login")
    }, 2000)
  }

  // console.log("typeof setValidation from component:",typeof setValidation);
  // console.log("state value :",state);

  return (
    <>
      <DocumentTitle pageTitle={"| RESET PASSWORD"} />

      {isLoading ? (
        <p style={{ textAlign: "center", fontSize: "30px" }} >Reset form loading...</p>
      ) : (
        <div className={styles.form_wrapper}>
          <div className={styles.form_container}>
            <div className={styles.title_container}>
              <h2>Reset Password</h2>
            </div>
            <div className={`${styles.row} ${styles.clearfix}`}>
              <div>
                <form onSubmit={handleFormSubmit} >

                  <div className={styles.input_field}>
                    <input type={showPassword ? 'text' : 'password'}
                      name="resetPassword"
                       placeholder="Enter new password"
                      onChange={onChangeHandle} 
                      value={state.resetPassword}/>
                    <span onClick={handleTogglePassword}>{showPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>

                  {showMessage && <p className={styles._show_indcator} >{showMessage.resetPassword}</p>}

                  <div className={styles.input_field}>

                    <input type={showConfirmPassword ? 'text' : 'password'}
                      name="resetPasswordConfirmPassword"
                      placeholder="Confirm password"
                      onChange={onChangeHandle}
                      value={state.resetPasswordConfirmPassword}
                    />
                    <span onClick={handleToggleConfirmPassword}>{showConfirmPassword ? <FaEye /> : <FaEyeSlash />}</span>
                  </div>

                  {showMessage && <p className={styles._show_indcator}>{showMessage.resetPasswordConfirmPassword}</p>}

                  <input className={styles.button}
                    type="submit"
                    value="Submit"
                    disabled={!isFormValid()}
                    style={{ cursor: !isFormValid() ? "not-allowed" : "pointer" }} />
                </form>
              </div>
            </div>
          </div>
        </div>
      )

      }

    </>
  );
};

export default ResetPassword;