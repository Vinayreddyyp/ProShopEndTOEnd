import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	SHIPPING_DETAILS_INFORMATION
} from '../constants/cartConstants';

export const cartReducer = (
	state = {
		cartItems: [],
		shippingAddress: {}
	},
	action
) => {
	debugger;
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;

			// if (state.cartItems && !state.cartItems.length) {
			// 	return null;
			// }
			const existItem = state.cartItems.find(x => x.product === item.product);

			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map(x =>
						x.product === existItem.product ? item : x
					)
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item]
				};
			}
		case CART_REMOVE_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter(x => {
					console.log('x', x.product, action.payload);
					return x.product === action.payload;
				})
			};

		case SHIPPING_DETAILS_INFORMATION:
			return {
				...state,
				shippingAddress: action.payload
			};

		case CART_SAVE_PAYMENT_METHOD:
			return {
				...state,
				paymentMethod: action.payload
			};

		default:
			return {
				...state
			};
	}
};
