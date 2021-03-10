import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';

const protect = asyncHandler(async (req, res, next) => {
	let token;
	console.log(req.headers.authorization);
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		try {
			token = req.headers.authorization.split('')[1];
			console.log('token', token);
			const decoded = jwt.verify(token);
			console.log('decoded', decoded);
			next();
		} catch (error) {}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { protect };
