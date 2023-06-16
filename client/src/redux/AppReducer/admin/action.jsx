import {
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST_FAILUE,
    DELETE_PRODUCT_REQUEST_SUCCESS
} from "../../../Constant/actionTypes";
import getLoggedUserData from "../../../utils/LoggedUserData";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const LoggedUser = getLoggedUserData()

const deleteProduct = (payload) => async (dispatch) => {
    console.log(payload);
    dispatch({ type: DELETE_PRODUCT_REQUEST });
    // let response = null;
    // try {
    //     let res = await fetch(`${BASE_URL}/api/products/delete`, {
    //         method: "DELETE",
    //         body: JSON.stringify({ product_id: payload.productId }),
    //         headers: {
    //             "Content-Type": "application/json",
    //             token: payload.token ?? LoggedUser.token ?? "",
    //         },
    //     });

    //     response = await res.json();


    //     if (response && response.message === "Product deleted success") {
    //         dispatch({
    //             type: DELETE_PRODUCT_REQUEST_SUCCESS,
    //             payload: {
    //                 id: payload.productId,
    //                 response: response.message
    //             }
    //         });
    //     }


    // } catch (error) {
    //     dispatch({
    //         type: DELETE_PRODUCT_REQUEST_FAILUE,
    //         payload: response,
    //     });
    // }
};


export {
    deleteProduct
}