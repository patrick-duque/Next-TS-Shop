import { useState } from 'react';
import axios from '../../helpers/api/axios';
import { useDispatch } from 'react-redux';
import { addToCartItem } from '../../store/user/userActions';

//Components
import { Fragment } from 'react';
import Link from 'next/link';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import Head from '../../components/Head';
import Rating from '../../components/Rating';
import { IconContext } from 'react-icons';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

//Models
import { GetStaticProps, GetStaticPaths } from 'next';
import Product from '../../models/product';

interface Props {
	product: Product;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const product: Product = (await axios.get(`/products/${params._id}`)).data;
	return {
		props: { product }
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	const products: Product[] = (await axios.get('/products')).data;
	const route = products.map(prod => ({ params: { _id: prod._id } }));
	return {
		paths: route,
		fallback: false
	};
};

const ProductDetails: React.FC<Props> = ({ product }) => {
	const dispatch = useDispatch();
	const [ qty, setQty ] = useState<number>(1);

	const handleAddToCart = () => {
		dispatch(addToCartItem({ product: { ...product }, quantity: qty }));
	};

	return (
		<Fragment>
			<Head title={product.name} />
			<Container fluid>
				<div className='my-3 mx-0'>
					<Link href='/'>
						<a>
							<IconContext.Provider value={{ size: '2em' }}>
								<RiArrowGoBackLine />
							</IconContext.Provider>
						</a>
					</Link>
				</div>
				<Row>
					<Col md={5} className='text-center'>
						<Image src={product.image} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<div className='bg-dark'>
							<h3>{product.name}</h3>
						</div>
						<div className='bg-dark my-5'>
							<Rating value={product.rating} numOfReview={product.numReviews} />
						</div>
						<div className='bg-dark my-5'>
							Description: <div className='mt-2'>{product.description}</div>
						</div>
					</Col>
					<Col md={3}>
						<div className='bg-dark'>
							<Row>
								<Col>Price:</Col>
								<Col>
									<strong>₱{product.price}</strong>
								</Col>
							</Row>
						</div>
						<div className='bg-dark my-5'>
							<Row>
								<Col>Stocks:</Col>
								<Col>
									<strong>{product.countInStock === 0 ? 'Out of stock' : 'In stock'}</strong>
								</Col>
							</Row>
						</div>
						{product.countInStock > 0 && (
							<div className='bg-dark my-5'>
								<Row>
									<Col sm={5}>Quantity:</Col>
									<Col sm={7} md={7} lg={7} className='text-center'>
										<Row>
											<Col sm={4}>
												<Button
													size='sm'
													variant='dark'
													className='ml-sm-2 ml-md-0'
													onClick={() => setQty(qty + 1)}
													disabled={qty === product.countInStock}>
													<AiOutlinePlus />
												</Button>
											</Col>
											<Col sm={2}>
												<p>
													<strong>{qty}</strong>
												</p>
											</Col>
											<Col sm={4}>
												<Button
													size='sm'
													variant='dark'
													className='mr-sm-2 mr-md-0'
													onClick={() => setQty(qty - 1)}
													disabled={qty <= 1}>
													<AiOutlineMinus />
												</Button>
											</Col>
										</Row>
									</Col>
								</Row>
							</div>
						)}
						<div className='bg-dark my-5'>
							<Row>
								<Col>
									<Button
										variant='light'
										className='btn-block'
										onClick={handleAddToCart}
										disabled={product.countInStock === 0}>
										ADD TO CART
									</Button>
								</Col>
							</Row>
						</div>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default ProductDetails;
