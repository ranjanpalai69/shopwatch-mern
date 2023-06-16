


import {
    ADD_CART_REQUEST,
    ADD_CART_REQUEST_FAILUE,
    ADD_CART_REQUEST_SUCESS,

    GET_CART_REQUEST,
    GET_CART_REQUEST_FAILUE,
    GET_CART_REQUEST_SUCESS,

    REMOVE_ALL_CART_REQUEST,
    REMOVE_ALL_CART_REQUEST_FAILUE,
    REMOVE_ALL_CART_REQUEST_SUCESS,

    REMOVE_SINGLE_CART_REQUEST,
    REMOVE_SINGLE_CART_REQUEST_FAILUE,
    REMOVE_SINGLE_CART_REQUEST_SUCESS,


} from "../../../Constant/actionTypes"


import {
    AddtoCartIntial,
    getCartDataIntial,
    removeAllCart,
    removeSingleCart,
} from "../../../objects/Objects"


const addToCartReducer = (state = AddtoCartIntial, { type, payload }) => {
    switch (type) {

        case ADD_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case ADD_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case ADD_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const getCartDataReducer = (state = getCartDataIntial, { type, payload }) => {
    switch (type) {

        case GET_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case GET_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case GET_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}


const RemoveSingleCartReducer = (state = removeSingleCart, { type, payload }) => {
    switch (type) {

        case REMOVE_SINGLE_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_SINGLE_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case REMOVE_SINGLE_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

const RemoveAllCartReducer = (state = removeAllCart, { type, payload }) => {
    switch (type) {

        case REMOVE_ALL_CART_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case REMOVE_ALL_CART_REQUEST_SUCESS:
            return {
                ...state,
                response: payload,
                isLoading: false

            }
        case REMOVE_ALL_CART_REQUEST_FAILUE:
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        default: return state
    }
}

export {
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,

}