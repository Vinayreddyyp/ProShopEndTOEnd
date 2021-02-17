import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card
} from 'react-bootstrap';
import Message from '../components/Message';
import { addCart } from '../actions/cartActions';

const Cart = ({ match, location, history }) => {
	const productId = match.params.id;
	const qty = location.search ? Number(location.search.split('=')[1]) : 1;

	console.log('qty', qty);
	console.log('location.search', location.search);
	const dispatch = useDispatch();

	useEffect(() => {
		if (productId) {
			dispatch(addCart(productId, qty));
		}
	}, [dispatch, productId, qty]);
	return (
		<div>
			<h1>Cart</h1>
		</div>
	);
};

export default Cart;
