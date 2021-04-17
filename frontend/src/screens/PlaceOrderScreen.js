import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, ListGroup, Image, Card, Button } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
	const cart = useSelector(state => state.cart);
	console.log('cart in selector of palce order screen', cart.cartItems);
	cart.itemsPrice = cart.cartItems.reduce((acc, item) => {
		console.log('acc', acc + item.price);
		console.log('item.price', item.price);
		console.log('item.qty', item.qty);
		return acc + item.price * item.qty;
	}, 0);

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong>
								{cart.shippingAddress.address},{cart.shippingAddress.city},
								{cart.shippingAddress.country},{' '}
								{cart.shippingAddress.postalcode}
							</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>PAYMENT METHOD</h2>
							<p>{cart.paymentMethod}</p>
						</ListGroup.Item>
						<ListGroup.Item>
							<h2>ORDER ITEMS</h2>
							{cart.cartItems.length === 0 ? (
								<Message>your cart is empty no products</Message>
							) : (
								<ListGroup variant="flush">
									{cart.cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${item.price} = ${item.qty * item.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>ORDER SUMMARY</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default PlaceOrderScreen;
