import {
  ADD_WISHLIST_REQUEST,
  ADD_WISHLIST_REQUEST_FAILUE,
  ADD_WISHLIST_REQUEST_SUCESS,
  GET_WISHLIST_REQUEST,
  GET_WISHLIST_REQUEST_FAILUE,
  GET_WISHLIST_REQUEST_SUCESS,
  REMOVE_WISHLIST_REQUEST,
  REMOVE_WISHLIST_REQUEST_FAILUE,
  REMOVE_WISHLIST_REQUEST_SUCESS,
} from "../../../Constant/actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AddWishListAction = (payload) => async (dispatch) => {
  dispatch({ type: ADD_WISHLIST_REQUEST });
  let responseData = null;

  try {
    const res = await fetch(`${BASE_URL}/api/wishlist/add`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: payload.token,
      },
    });

    responseData = await res.json();

    // console.log("responseData:-", responseData);

    if (responseData && responseData.message === "Product added to wishlist") {
      //   console.log("responseData:-", responseData.newWishlist.products);
      dispatch({
        type: ADD_WISHLIST_REQUEST_SUCESS,
        payload: responseData.newWishlist.products,
      });
    } else {
      dispatch({
        type: ADD_WISHLIST_REQUEST_FAILUE,
        payload: responseData && responseData.message,
      });
    }
    return responseData.message;
  } catch (error) {
    dispatch({
      type: ADD_WISHLIST_REQUEST_FAILUE,
      payload: responseData ? responseData.message : error.message,
    });
  }
};

const GetWishListAction = (payload) => async (dispatch) => {
  dispatch({ type: GET_WISHLIST_REQUEST });
  let responseData = null;
  // console.log("token::-", payload.token);
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: payload.token,
      },
    });

    responseData = await res.json();
    // console.log("responseData:- getting data", responseData);

    if (responseData && responseData[0].userId) {
      dispatch({
        type: GET_WISHLIST_REQUEST_SUCESS,
        payload: responseData[0].products,
      });
    } else {
      dispatch({
        type: GET_WISHLIST_REQUEST_FAILUE,
        payload: responseData && responseData.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_WISHLIST_REQUEST_FAILUE,
      payload: responseData ? responseData.msg : error.message,
    });
  }
};

const RemoveWishListAction = (payload) => async (dispatch) => {
  dispatch({ type: REMOVE_WISHLIST_REQUEST });
  let responseData = null;
  // console.log("token::-", payload);
  try {
    const res = await fetch(`${BASE_URL}/api/wishlist/remove`, {
      method: "DELETE",
      body: JSON.stringify({ productId: payload.productId }),
      headers: {
        "Content-Type": "application/json",
        token: payload.token,
      },
    });

    responseData = await res.json();
   

    if (responseData && responseData.hint === "reSuc") {
      dispatch({
        type: REMOVE_WISHLIST_REQUEST_SUCESS,
        payload: payload.productId,
      });
    } else {
      dispatch({
        type: REMOVE_WISHLIST_REQUEST_FAILUE,
        payload: responseData && responseData.msg,
      });
    }

    return responseData;
  } catch (error) {
    dispatch({
      type: REMOVE_WISHLIST_REQUEST_FAILUE,
      payload: responseData ? responseData.msg : error.message,
    });
  }
};

export { AddWishListAction, GetWishListAction, RemoveWishListAction };
