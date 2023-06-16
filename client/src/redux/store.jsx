import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";

import {
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    ChangePasswordReducer,
 
} from "./AuthReducer/reducer";

import {
    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer

} from "./AppReducer/products/reducer";


import {
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,
} from "./AppReducer/cart/reducer";


import wishlistReducer from "./AppReducer/wishlist/reducer"

import {
    deliveryAddressReducer,
    AddressReducer,

} from "./AppReducer/checkout/reducer";

import {
    OrdersReducer,
    GetSingleOrderReducer
} from "./AppReducer/orders/reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const combineReducer = combineReducers({
    signupReducer,
    loginReducer,
    forgetPasswordReducer,
    resetPasswordReducer,
    ChangePasswordReducer,


    getProductReducer,
    getProductDetailsReducer,
    addReviwReducer,
    
    
    addToCartReducer,
    getCartDataReducer,
    RemoveSingleCartReducer,
    RemoveAllCartReducer,


    deliveryAddressReducer,
    AddressReducer,


    wishlistReducer,

    OrdersReducer,
    GetSingleOrderReducer
})
export const store = legacy_createStore(combineReducer, composeEnhancers(applyMiddleware(thunk)))
