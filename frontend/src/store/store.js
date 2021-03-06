import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
	productListReducer,
	productDetailReducer
} from '../reducers/productReducers';
import { cartReducer } from '../reducers/cartReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
	userLoginReducer,
	userRegisterReducer,
	userDetailReducer,
	updateUserProfileReducer
} from '../reducers/userReducer';

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailReducer,
	updateProfile: updateUserProfileReducer
});
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

const userLoginStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null;
const shippingAddressInformation = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: null;

const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressInformation
	},
	userLogin: { userInfo: userLoginStorage }
};
const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
