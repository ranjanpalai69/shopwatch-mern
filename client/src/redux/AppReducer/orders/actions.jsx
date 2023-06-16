import {




    GET_ORDERS_REQUEST,
    GET_ORDERS_REQUEST_SUCCESS,
    GET_ORDERS_REQUEST_FAILUE,

    ADD_ORDER_REQUEST,
    ADD_ORDER_REQUEST_SUCCESS,
    ADD_ORDER_REQUEST_FAILUE,


    GET_SINGLE_ORDER_REQUEST,
    GET_SINGLE_ORDER_REQUEST_SUCCESS,
    GET_SINGLE_ORDER_REQUEST_FAILUE,

    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_REQUEST_SUCCESS,
    CANCEL_ORDER_REQUEST_FAILUE,

} from "../../../Constant/actionTypes";

import getLoggedUserData from "../../../utils/LoggedUserData";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LoggedUser = getLoggedUserData()

const AddOrderAction = (payload) => async (dispatch) => {
    dispatch({ type: ADD_ORDER_REQUEST });
    let response = null;
    try {
        let res = await fetch(`${BASE_URL}/api/order/post`, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            },
        });

        response = await res.json();


        if (response && response.hint === "orSucc") {
            dispatch({
                type: ADD_ORDER_REQUEST_SUCCESS,
                payload: response,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: ADD_ORDER_REQUEST_FAILUE,
            payload: response,
        });
    }
};

const GetOrderAction = (payload) => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    let response = null;
    try {
        let res = await fetch(`${BASE_URL}/api/order/get`, {
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            },
        });

        response = await res.json();

        // console.log("action response for all orders:-",response);

        if (response && response[0]._id) {
            dispatch({
                type: GET_ORDERS_REQUEST_SUCCESS,
                payload: response,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: GET_ORDERS_REQUEST_FAILUE,
            payload: response
        });
    }
};

const GetSingleOrderAction = (payload) => async (dispatch) => {
    // console.log("payload from component:-",payload);
    dispatch({ type: GET_SINGLE_ORDER_REQUEST });
    try {
        let res = await fetch(`${BASE_URL}/api/order/get/singleOrder`, {
            method: "POST",
            body: JSON.stringify({ orderId: payload.orderId }),
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            }
        });
        // console.log("res only:-",res);
        const response = await res.json();
        // console.log("action response for single order:-", response);
        if (response) {
            dispatch({
                type: GET_SINGLE_ORDER_REQUEST_SUCCESS,
                payload: response,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: GET_SINGLE_ORDER_REQUEST_FAILUE,
        });
    }
};

const deleteOrderAtion = (payload) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        let res = await fetch(`${BASE_URL}/api/order/remove`, {
            method: "DELETE",
            body: JSON.stringify({ orderId: payload.orderId, productId: payload.productId }),
            headers: {
                "Content-Type": "application/json",
                token: payload.token ?? LoggedUser.token ?? "",
            }
        });
        // console.log("res only:-",res);
        const response = await res.json();
        // console.log("action response for single order:-",response);
        if (response) {
            dispatch({
                type: CANCEL_ORDER_REQUEST_SUCCESS,
                payload: payload.productId,
            });
        }

        return response;
    } catch (error) {
        dispatch({
            type: CANCEL_ORDER_REQUEST_FAILUE,
        });
    }
}


export {
    AddOrderAction,
    GetOrderAction,
    GetSingleOrderAction,
    deleteOrderAtion
}