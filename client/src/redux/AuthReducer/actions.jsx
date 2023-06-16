import {

  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_REQUEST_FAILUE,
  CHANGE_PASSWORD_REQUEST_SUCESS,

  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_REQUEST_FAILUE,
  FORGET_PASSWORD_REQUEST_SUCESS,

  LOGIN_REQUEST,
  LOGIN_REQUEST_FAILUE,
  LOGIN_REQUEST_SUCESS,


  LOGOUT_REQUEST,
  LOGOUT_REQUEST_FAILUE,
  LOGOUT_REQUEST_SUCCESS,


  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_FAILUE,
  RESET_PASSWORD_REQUEST_SUCESS,


  SIGNUP_REQUEST,
  SIGNUP_REQUEST_FAILUE,
  SIGNUP_REQUEST_SUCESS,


} from "../../Constant/actionTypes";

// const BASE_URL = "http://localhost:8080/api/users";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const SignupActionObj = (payload) => async (dispatch) => {
  // console.log("payload::-",payload);
  dispatch({ type: SIGNUP_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/users/register`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    // console.log("responseData:-", responseData)
    // console.log("res::-res",res)

    if (res.ok) {
      dispatch({ type: SIGNUP_REQUEST_SUCESS, payload: responseData });
    } else {
      dispatch({ type: SIGNUP_REQUEST_FAILUE, payload: responseData.error });
      // console.log("responseData.error:-",responseData.error)
    }
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const SigninActionObj = (payload) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const res = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    // console.log("responseData:-", responseData)
    // console.log("res::-res",res)

    if (res.ok) {
      dispatch({ type: LOGIN_REQUEST_SUCESS, payload: responseData });
    } else {
      dispatch({ type: LOGIN_REQUEST_FAILUE, payload: responseData.error });
      // console.log("responseData.error:-",responseData.error)
    }
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const ForgetPassActionObj = (payload) => async (dispatch) => {
  dispatch({ type: FORGET_PASSWORD_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/users/forget/password`, {
      method: "POST",
      body: JSON.stringify({ email: payload }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    // console.log("responseData:-", responseData)
    // console.log("res::-res",res)

    if (res.ok) {
      dispatch({ type: FORGET_PASSWORD_REQUEST_SUCESS, payload: responseData });
    } else {
      dispatch({
        type: FORGET_PASSWORD_REQUEST_FAILUE,
        payload: responseData.error,
      });
      // console.log("responseData.error:-",responseData.error)
    }
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const ResetPassActionObj = (payload) => async (dispatch) => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    const res = await fetch(`${BASE_URL}/api/users/resetPassword`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await res.json();

    // console.log("responseData:-", responseData)
    // console.log("res::-res",res)

    if (res.ok) {
      dispatch({ type: RESET_PASSWORD_REQUEST_SUCESS, payload: responseData });
    } else {
      dispatch({
        type: RESET_PASSWORD_REQUEST_FAILUE,
        payload: responseData.error,
      });
      // console.log("responseData.error:-",responseData.error)
    }
    return responseData;
  } catch (error) {
    console.log(error);
  }
};

const ChangePasswordAction = (payload) => async (dispatch) => {
  dispatch({ type: CHANGE_PASSWORD_REQUEST });
  let responseData = null;

  try {
    const res = await fetch(`${BASE_URL}/api/users/change/password`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });

    responseData = await res.json();

    if (res.ok) {
      dispatch({ type: CHANGE_PASSWORD_REQUEST_SUCESS, payload: responseData.msg });
    } else {
      dispatch({
        type: CHANGE_PASSWORD_REQUEST_FAILUE,
        payload: responseData && responseData.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST_FAILUE,
      payload: responseData ? responseData.msg : error.message,
    });
  }
};

const LogoutActionCreator=()=>(dispatch)=>{
 
  dispatch({type:LOGOUT_REQUEST})
  dispatch({type:LOGOUT_REQUEST_SUCCESS})
  dispatch({type:LOGOUT_REQUEST_FAILUE})
}


export {
  SignupActionObj,
  SigninActionObj,
  ForgetPassActionObj,
  ResetPassActionObj,
  ChangePasswordAction,
  LogoutActionCreator

};
