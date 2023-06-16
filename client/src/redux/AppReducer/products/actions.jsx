import {
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_REQUEST_FAILUE,
    ADD_REVIEW_REQUEST_SUCESS,
    
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_REQUEST_FAILUE,
    GET_PRODUCT_DETAILS_REQUEST_SUCESS,

    GET_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST_FAILUE,
    GET_PRODUCT_REQUEST_SUCESS,
} from "../../../Constant/actionTypes";

const BASE_URL = process.env.REACT_APP_BASE_URL;


const getProductsData = (params = {}) => {
  // console.log("params::-",params);
  return async (dispatch) => {
    dispatch({ type: GET_PRODUCT_REQUEST });
    try {
      let url = `${BASE_URL}/api/products/get`;

      const queryParams = [];
      for (const key in params) {
        if (Array.isArray(params[key])) {
          if (params[key].length === 1) {
            queryParams.push(`${key}=${params[key][0]}`);
          } else if (params[key].length > 1) {
            params[key].forEach((value) => {
              queryParams.push(`${key}=${value}`);
            });
          }
        } else if (params[key] !== undefined) {
          queryParams.push(`${key}=${params[key]}`);
        }
      }

      const query = queryParams.join("&");

      if (query) {
        url += `?${query}`;
      }

      // console.log("url::-",url);
      let res = await fetch(url);
      let data = await res.json();
      dispatch({ type: GET_PRODUCT_REQUEST_SUCESS, payload: data});
    } catch (error) {
      dispatch({ type: GET_PRODUCT_REQUEST_FAILUE });
    }
  };
};

const getProductDetails = (id) => {
    return async (dispatch) => {
        dispatch({ type: GET_PRODUCT_DETAILS_REQUEST });

        try {
            let res = await fetch(`${BASE_URL}/api/products/get/${id}`);
            let data = await res.json();
            // console.log(data);
            dispatch({
                type: GET_PRODUCT_DETAILS_REQUEST_SUCESS,
                payload: data.product,
            });
        } catch (error) {
            dispatch({ type: GET_PRODUCT_DETAILS_REQUEST_FAILUE });
        }
    };
};

const addReviewAction = (payload) => async (dispatch) => {
    dispatch({ type: ADD_REVIEW_REQUEST });
    // console.log("payload::-",payload);
    try {
      let res = await fetch(`${BASE_URL}/api/products/review`, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
          token: payload.token,
        },
      });
  
      let response = await res.json();
      // console.log("revuiwes add response::-", response);
  
      if (response && response.message === "Review Added") {
        dispatch({ type: ADD_REVIEW_REQUEST_SUCESS, payload: response.message });
      }
  
      return response;
    } catch (error) {
      dispatch({ type: ADD_REVIEW_REQUEST_FAILUE });
    }
  };

export {
    getProductsData,
    getProductDetails,
    addReviewAction
}
