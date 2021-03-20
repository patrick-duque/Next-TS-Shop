import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Router from 'next/router';
import Rating from './Rating';

import ProductModel from '../models/product';

import styles from '../styles/Product.module.scss';

interface Props {
	product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
	const routeName = `/products/${product._id}`;

	return (
		<Card className={`my-3 ${styles.Product}`}>
			<Link href={routeName}>
				<Card.Img variant='top' src={`https://lit-mesa-58105.herokuapp.com${product.image}`} className={styles.image} />
			</Link>
			<Card.Body>
				<div className='mb-5'>
					<Link href={routeName}>
						<p className='m-0'>
							<strong>{product.name}</strong>
						</p>
					</Link>
					<p className='text-muted m-0'>{product.brand}</p>
				</div>
				<Rating value={product.rating} numOfReview={product.numReviews} />
				<div className='d-flex justify-content-between mt-2'>
					<p className='my-2'>
						<strong>₱{product.price}</strong>
					</p>
					<Button onClick={() => Router.push(routeName)}>Check Product</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default Product;
