

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

import {
    changePasswordInitial,
    forgetPasswordInitial,
    loginInitial,
    resetPasswordIntial,
    signupInitial,
} from "../../objects/Objects";


const signupReducer = (state = signupInitial, { type, payload }) => {
    switch (type) {

        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoading: true

            }

        case SIGNUP_REQUEST_SUCESS:
            // console.log("payload:-",payload);
            localStorage.setItem("registration", JSON.stringify(payload))
            return {
                ...state,
                data: payload,
                isLoading: false
            }

        case SIGNUP_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const loginReducer = (state = loginInitial, { type, payload }) => {
    switch (type) {

        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case LOGIN_REQUEST_SUCESS:
            localStorage.setItem("loggedUser", JSON.stringify(payload))
            return {
                ...state,
                isAuth: true,
                isLoading: false
            }
        case LOGOUT_REQUEST_SUCCESS:
            localStorage.removeItem("loggedUser")
            if (localStorage.getItem("registration")) {
                localStorage.removeItem("registration");
            }
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                message: "Logout Successful."
            }

        case LOGIN_REQUEST_FAILUE:
        case LOGOUT_REQUEST_FAILUE:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                isError: true

            }
        default: return state
    }
}

const forgetPasswordReducer = (state = forgetPasswordInitial, { type, payload }) => {

    switch (type) {

        case FORGET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case FORGET_PASSWORD_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false
            }

        case FORGET_PASSWORD_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

const resetPasswordReducer = (state = resetPasswordIntial, { type, payload }) => {

    switch (type) {

        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case RESET_PASSWORD_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false
            }

        case RESET_PASSWORD_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

const ChangePasswordReducer = (state = changePasswordInitial, { type, payload }) => {
    switch (type) {
        case CHANGE_PASSWORD_REQUEST:
            return {
                ...state,
                isLoading: true,
            };

        case CHANGE_PASSWORD_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false,
                isError: null,
            };

        case CHANGE_PASSWORD_REQUEST_FAILUE:
            return {
                ...state,
                isError: payload,
                isLoading: false,
            };

        default:
            return state;
    }
};



export {
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    ChangePasswordReducer
}