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
			token = req.headers.authorization.split(' ')[1];
			console.log('token', token);
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log('decoded', decoded);
			req.user = await (await User.findById(decoded.id)).isSelected(
				'-password'
			);
			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error('token failed');
		}
	}
	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token');
	}
});

export { protect };
