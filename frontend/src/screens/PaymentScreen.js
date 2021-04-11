import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ({ history }) => {
	const dispatch = useDispatch();
	const cart = useSelector(state => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState('payPal');

	if (!shippingAddress) {
		history.push('/shipping');
	}
	const onSubmitHandler = e => {
		e.preventDefault();
		dispatch(savePaymentMethod(paymentMethod));
		history.push('/palceorder');
	};

	return (
		<div>
			<CheckoutSteps step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={e => onSubmitHandler(e)}>
				<Form.Group controlId="address">
					<Form.Label as="legend">Select</Form.Label>
					<Form.Check
						type="radio"
						id="Paypal"
						label="Paypal or Credit Card"
						value="Paypal"
						name="paymentMethod"
						checked
						onChange={e => setPaymentMethod(e.target.value)}
					></Form.Check>
					<Form.Check
						type="radio"
						id="Stripe"
						label="Stripe"
						value="Stripe"
						name="paymentMethod"
						checked
						onChange={e => setPaymentMethod(e.target.value)}
					></Form.Check>
				</Form.Group>
				<Button type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</div>
	);
};

export default ShippingScreen;
