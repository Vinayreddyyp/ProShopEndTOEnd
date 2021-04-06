import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	SHIPPING_DETAILS_INFORMATION
} from '../constants/cartConstants';

export const addCart = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/products/${id}`);
	console.log('data', data);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty
		}
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromcart = id => (dispatch, getState) => {
	console.log('id of action creator ', id);
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => (dispatch, getState) => {
	console.log('data ', data);
	dispatch({
		type: SHIPPING_DETAILS_INFORMATION,
		payload: data
	});
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};
