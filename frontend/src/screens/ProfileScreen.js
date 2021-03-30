import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails } from '../actions/userActions';

const ProfileScreen = ({ location, history }) => {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();

	const userDetails = useSelector(state => state.userDetails);
	console.log('userDetails', userDetails);
	const { loading, error, user } = userDetails;

	const userLogin = useSelector(state => state.userLogin);
	const { userInfo } = userLogin;

	const redirect = location.search ? location.search.split('=')[1] : '/';

	useEffect(() => {
		if (!userInfo) {
			console.log('insdie if history', history);
			history.push('/login');
		} else if (!user.name) {
			dispatch(getUserDetails('profile'));
		} else {
			setName(user.name);
			setEmail(user.email);
		}

		console.log('history', history);
	}, [history, userInfo, redirect, user]);

	const onSubmitHandler = e => {
		e.preventDefault();
		console.log('submit sucess');
		if (password !== confirmPassword) {
			setMessage('please enter exact password');
		} else {
			//Dispatch update profile
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h1>User Profile</h1>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				<Form onSubmit={e => onSubmitHandler(e)}>
					<Form.Group controlId="name">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter your name"
							value={name}
							onChange={e => setName(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter your Email ID"
							value={email}
							onChange={e => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter your Password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId="password">
						<Form.Label>password</Form.Label>
						<Form.Control
							type="confirmPassword"
							placeholder="Enter your Password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					{message && <p>{message}</p>}
					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>OREDERS</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
