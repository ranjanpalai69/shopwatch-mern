

import {
    GET_PRODUCT_DETAILS_REQUEST,
    GET_PRODUCT_DETAILS_REQUEST_FAILUE,
    GET_PRODUCT_DETAILS_REQUEST_SUCESS,

    GET_PRODUCT_REQUEST,
    GET_PRODUCT_REQUEST_FAILUE,
    GET_PRODUCT_REQUEST_SUCESS,

    ADD_REVIEW_REQUEST,
    ADD_REVIEW_REQUEST_FAILUE,
    ADD_REVIEW_REQUEST_SUCESS,

    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_REQUEST_FAILUE,
    DELETE_PRODUCT_REQUEST_SUCCESS,
} from "../../../Constant/actionTypes";

import {
    addReviewInitial,
    getProductDetailsInitial,
    getProductIntial,
} from "../../../objects/Objects"



const getProductReducer = (state = getProductIntial, { type, payload }) => {
    switch (type) {

        case GET_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCT_REQUEST_SUCESS:

            return {
                ...state,
                products: payload.products,
                totalProductspage: payload.totalPage,
                isLoading: false

            }

        // by admin only
        case DELETE_PRODUCT_REQUEST_SUCCESS:
            console.log("state.products:", state.products);
            console.log("payloadData:", payload);
            const updatedProduct = state.products.filter(item=>item._id!==payload.id);

            return {
                ...state,
                products: updatedProduct,
                responseMsg: payload.response,
                isLoading: false
            }
        case GET_PRODUCT_REQUEST_FAILUE:
        case DELETE_PRODUCT_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const getProductDetailsReducer = (state = getProductDetailsInitial, { type, payload }) => {
    switch (type) {

        case GET_PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_PRODUCT_DETAILS_REQUEST_SUCESS:
            return {
                ...state,
                product: payload,
                isLoading: false

            }
        case GET_PRODUCT_DETAILS_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

const addReviwReducer = (state = addReviewInitial, { type, payload }) => {
    switch (type) {

        case ADD_REVIEW_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ADD_REVIEW_REQUEST_SUCESS:
            return {
                ...state,
                addReview: payload,
                isLoading: false

            }
        case ADD_REVIEW_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}



export {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer
}