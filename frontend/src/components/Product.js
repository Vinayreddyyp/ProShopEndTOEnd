import React from 'react';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
	console.log('products', product);
	return (
		<Card className="my-3 p-3 rounded">
			<Link to={`/product/${product._id}`}>
				<Card.Img src={product.image} variant="top" />
			</Link>
			<Card.Body>
				<Link to={`/product/${product._id}`}>
					<Card.Title as="div">
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as="div">
					<div className="my-3">
						{product.rating} from {product.numReviews} reviews
					</div>
				</Card.Text>
				<Card.Text as="h3">${product.price}</Card.Text>
			</Card.Body>

			<Card.Body>
				<Card.Text as="div">
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
			</Card.Body>
		</Card>
	);

	// return (
	// 	<div>
	// 		<h1>{product._id}</h1>
	// 		<h2>{product.name}</h2>
	// 		<h3>{product.rating}</h3>
	// 	</div>
	// );
};

export default Product;
