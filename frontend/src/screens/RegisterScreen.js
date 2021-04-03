import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const userRegister = useSelector(state => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const redirect = location.search ? location.search.split('=')[1] : '/';
	console.log('redirect', location);

	useEffect(() => {
		if (userInfo) {
			console.log('insdie if history', history);
			history.push(redirect);
		}

		console.log('history', history);
	}, [history, userInfo, redirect]);

	const onSubmitHandler = e => {
		e.preventDefault();
		console.log('submit sucess');
		if (password !== confirmPassword) {
			setMessage('please enter exact password');
		} else {
			dispatch(register(name, email, password));
		}
	};

	return (
		<div>
			<FormContainer>
				<h1>Sign In</h1>
				{message && <Message variant="danger">{message}</Message>}
				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader>Loading</Loader>}
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
						Submit
					</Button>
				</Form>
				<Row>
					<Col>
						Have an Account ?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row>
			</FormContainer>
		</div>
	);
};

export default RegisterScreen;
