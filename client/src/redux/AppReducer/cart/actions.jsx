
import {
    ADD_CART_REQUEST,
    ADD_CART_REQUEST_FAILUE,
    ADD_CART_REQUEST_SUCESS,

    DECREMENT_CART_QUANTYTI_REQUEST,

    DECREMENT_CART_QUANTYTI_REQUEST_FAILUE,

    DECREMENT_CART_QUANTYTI_REQUEST_SUCESS,

    GET_CART_REQUEST,
    GET_CART_REQUEST_FAILUE,
    GET_CART_REQUEST_SUCESS,

    INCREMENT_CART_QUANTYTI_REQUEST,

    INCREMENT_CART_QUANTYTI_REQUEST_FAILUE,

    INCREMENT_CART_QUANTYTI_REQUEST_SUCESS,

    REMOVE_ALL_CART_REQUEST,
    REMOVE_ALL_CART_REQUEST_FAILUE,
    REMOVE_ALL_CART_REQUEST_SUCESS,

    REMOVE_SINGLE_CART_REQUEST,
    REMOVE_SINGLE_CART_REQUEST_FAILUE,
    REMOVE_SINGLE_CART_REQUEST_SUCESS,


} from "../../../Constant/actionTypes"
import getLoggedUserData from "../../../utils/LoggedUserData";

const LoggedUser = getLoggedUserData();

const BASE_URL = process.env.REACT_APP_BASE_URL;

const addToCartAction = (payload) => async (dispatch) => {
    dispatch({ type: ADD_CART_REQUEST });
    // console.log("payload::-",payload);
    try {
      let res = await fetch(`${BASE_URL}/api/cart/add`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          token: payload.token,
        },
      });
  
      let response = await res.json();
      // console.log("revuiwes add response::-", response);
  
      if (response && response.msg === "product added to cart successs") {
        dispatch({ type: ADD_CART_REQUEST_SUCESS, payload: response.msg });
      }
  
      return response;
    } catch (error) {
      dispatch({ type: ADD_CART_REQUEST_FAILUE });
    }
  };
  
  const getCartData = (token) => {
    return async (dispatch) => {
      dispatch({ type: GET_CART_REQUEST });
  
      try {
        let res = await fetch(`${BASE_URL}/api/cart/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: token ?? LoggedUser.token ?? "",
          },
        });
        let data = await res.json();
        // console.log(data);
        dispatch({
          type: GET_CART_REQUEST_SUCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({ type: GET_CART_REQUEST_FAILUE });
      }
    };
  };
  
  const removerSingleCartAction = (payload) => {
    return async (dispatch) => {
      // console.log("payload::-", payload.productId);
      dispatch({
        type: REMOVE_SINGLE_CART_REQUEST,
      });
      try {
        let res = await fetch(`${BASE_URL}/api/cart/remove`, {
          method: "DELETE",
          body: JSON.stringify({ productId: payload.productId }),
          headers: {
            "Content-Type": "application/json",
            token: payload.token,
          },
        });
  
        let response = await res.json();
        if (response && response.msg === "Product removed from the cart") {
          dispatch({
            type: REMOVE_SINGLE_CART_REQUEST_SUCESS,
            payload: response.msg,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: REMOVE_SINGLE_CART_REQUEST_FAILUE,
        });
      }
    };
  };
  
  const removerAllCartAction = (payload) => {
    return async (dispatch) => {
      //  console.log("payload::-", payload)
      dispatch({
        type: REMOVE_ALL_CART_REQUEST,
      });
      try {
        let res = await fetch(`${BASE_URL}/api/cart/remove/all`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: payload,
          },
        });
  
        let response = await res.json();
        if (response && response.hint === "reAlSuc") {
          dispatch({
            type: REMOVE_ALL_CART_REQUEST_SUCESS,
            payload: response.msg,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: REMOVE_ALL_CART_REQUEST_FAILUE,
        });
      }
    };
  };


  const IncCartQuantytiAction = (payload) => {
    return async (dispatch) => {
      //  console.log("payload::-", payload)
      dispatch({
        type: INCREMENT_CART_QUANTYTI_REQUEST,
      });
      try {
        let res = await fetch(`${BASE_URL}/api/cart/incrementQuantity`,
          {
            method: "PATCH",
            body: JSON.stringify({ productId: payload.productId }),
            headers: {
              "Content-Type": "application/json",
              token: payload.token,
            },
          }
        );
  
        let response = await res.json();
        if (response && response.hint === "incQty") {
          dispatch({
            type: INCREMENT_CART_QUANTYTI_REQUEST_SUCESS,
            payload: response.msg,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: INCREMENT_CART_QUANTYTI_REQUEST_FAILUE,
        });
      }
    };
  };
  
  const DecCartQuantytiAction = (payload) => {
    return async (dispatch) => {
      //  console.log("payload::-", payload)
      dispatch({
        type: DECREMENT_CART_QUANTYTI_REQUEST,
      });
      try {
        let res = await fetch(`${BASE_URL}/api/cart/decrementQuantity`,
          {
            method: "PATCH",
            body: JSON.stringify({ productId: payload.productId }),
            headers: {
              "Content-Type": "application/json",
              token: payload.token,
            },
          }
        );
  
        let response = await res.json();
        if (response && response.hint === "decQty") {
          dispatch({
            type: DECREMENT_CART_QUANTYTI_REQUEST_SUCESS,
            payload: response.msg,
          });
        }
        return response;
      } catch (error) {
        dispatch({
          type: DECREMENT_CART_QUANTYTI_REQUEST_FAILUE,
        });
      }
    };
  };

  export {
    addToCartAction,
    getCartData,
    removerSingleCartAction,
    removerAllCartAction,
    IncCartQuantytiAction,
    DecCartQuantytiAction

}