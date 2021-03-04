import { Card } from 'react-bootstrap';
import Link from 'next/link';
import Rating from './Rating';

import ProductModel from '../models/product';

import styles from '../styles/Product.module.scss';

interface Props {
	product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
	return (
		<Card className={`my-3 ${styles.Product}`} border='light'>
			<Link href={`/products/${product._id}`}>
				<Card.Img variant='top' src={`https://lit-mesa-58105.herokuapp.com${product.image}`} className={styles.image} />
			</Link>
			<Card.Body className='d-flex flex-column'>
				<Link href={`/products/${product._id}`}>
					<Card.Title className={styles.title}>{product.name}</Card.Title>
				</Link>
				<Card.Subtitle className='my-2'>₱{product.price}</Card.Subtitle>
				<Card.Text>{product.description}</Card.Text>
				<Rating value={product.rating} numOfReview={product.numReviews} />
			</Card.Body>
		</Card>
	);
};

export default Product;
