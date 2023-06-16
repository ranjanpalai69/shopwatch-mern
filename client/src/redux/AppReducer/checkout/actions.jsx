import {
  ADD_DELIVERY_ADDRESS_FAILURE,
  ADD_DELIVERY_ADDRESS_REQUEST,
  ADD_DELIVERY_ADDRESS_SUCESS,


} from "../../../Constant/actionTypes";

import getLoggedUserData from "../../../utils/LoggedUserData";

// getting data from local storage
const LoggedUser = getLoggedUserData();

const BASE_URL = process.env.REACT_APP_BASE_URL;


const deliveryAddressActionObj = (payload) => async (dispatch) => {
  dispatch({ type: ADD_DELIVERY_ADDRESS_REQUEST });
  try {
    let res = await fetch(`${BASE_URL}/api/address`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
        token: payload.token ?? LoggedUser.token ?? "",
      },
    });

    const response = await res.json();

    if (response && response.hint === "deSuces") {
      dispatch({
        type: ADD_DELIVERY_ADDRESS_SUCESS,
        payload: response,
      });
    }

    return response;
  } catch (error) {
    dispatch({
      type: ADD_DELIVERY_ADDRESS_FAILURE,
    });
  }
};

const storeAddressAction = (payload) => {
  return {
    type: "DELIVERY_ADDRESS",
    payload,
  };
};



export {

  deliveryAddressActionObj,
  storeAddressAction,
 
};
