import { useState, useCallback } from 'react';
import axios from '../../helpers/api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCartItem } from '../../store/user/userActions';
import dateFormat from 'dateformat';
import { useForm } from 'react-hook-form';
import Router from 'next/router';

//Components
import Link from 'next/link';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Container, Row, Col, Image, Button, Alert, ListGroup, Form } from 'react-bootstrap';
import Head from '../../components/Head';
import Rating from '../../components/Rating';
import Quantity from '../../components/Quantity';
import { IconContext } from 'react-icons';
import { FiShoppingCart } from 'react-icons/fi';

//Models
import { GetStaticProps, GetStaticPaths } from 'next';
import Product from '../../models/product';
import GetProductsData from '../../models/getProductsData';
import { RootStore } from '../../store';
import { UserState } from '../../store/user/userReducer';

interface Props {
	product: Product;
}

interface ReviewData {
	comment: string;
	rating: number;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const product: Product = (await axios.get(`/products/${params._id}`)).data;
	return {
		props: { product }
	};
};

export const getStaticPaths: GetStaticPaths = async (context) => {
	const data: GetProductsData = (await axios.get('/products/all')).data;
	const route = data.products.map((prod) => ({ params: { _id: prod._id } }));
	console.log(context);
	return {
		paths: route,
		fallback: false
	};
};

const ProductDetails: React.FC<Props> = ({ product }) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState<number>(1);
	const [formError, setFormError] = useState<string>(null);
	const [uploadError, setUploadError] = useState<string>(null);
	const userState = useSelector<RootStore>((state) => state.user) as UserState;
	const { register, handleSubmit } = useForm();

	const handleAddToCart = () => {
		if (!userState.user) {
			Router.push('/login');
		} else {
			dispatch(addToCartItem({ product: { ...product }, quantity: qty }));
		}
	};

	const handleAddQuantity = useCallback(() => {
		return setQty(qty + 1);
	}, [qty]);

	const handleMinusQuantity = useCallback(() => {
		return setQty(qty - 1);
	}, [qty]);

	const handleSubmitReview = async (data: ReviewData) => {
		setFormError(null);
		if (+data.rating === 0) {
			setFormError('Please select a rate');
		} else if (!data.comment) {
			setFormError('Please add a comment');
		} else {
			try {
				const config = {
					headers: {
						Authorization: `Bearer ${userState.user.token}`
					}
				};
				const body = {
					name: userState.user.name,
					comment: data.comment,
					rating: +data.rating
				};
				const newReview = (await axios.post(`/products/${product._id}/reviews`, body, config)).data;
				product.reviews.push(newReview.review);
			} catch (error) {
				setUploadError('User already reviewed this product');
			}
		}
	};

	return (
		<>
			<Head title={product.name} />
			<div className='ml-4'>
				<Button variant='outline-primary' onClick={() => Router.back()}>
					<IconContext.Provider value={{ size: '2em' }}>
						<RiArrowGoBackLine />
					</IconContext.Provider>
				</Button>
			</div>
			<Container>
				<div className='my-3 mx-0' />
				<Row>
					<Col md={5} className='text-center'>
						<Image src={`https://lit-mesa-58105.herokuapp.com${product.image}`} alt={product.name} fluid />
					</Col>
					<Col md={7}>
						<div>
							<p className='text-primary mb-0'>{product.category}</p>
							<h3>
								<strong>{product.name}</strong>
							</h3>
							<Rating value={product.rating} numOfReview={product.numReviews} />
						</div>
						<div className='my-4'>
							<p>
								<strong>Description:</strong>
							</p>{' '}
							<div className='mt-2'>{product.description}</div>
						</div>
						<div>
							<Row>
								<Col xs={12} lg={6} className='d-flex align-items-end'>
									<h4>
										<strong>₱{product.price}</strong>
									</h4>
								</Col>
								{product.countInStock > 0 && (
									<Col xs={12} lg={6} className='mt-3 mt-lg-0'>
										<Row>
											<Col className='p-0 d-flex align-items-end'>
												<Quantity
													qty={qty}
													addQuantity={handleAddQuantity}
													minusQuantity={handleMinusQuantity}
													countInStock={product.countInStock}
												/>
											</Col>
											<Col className='p-0'>
												<Button onClick={handleAddToCart} disabled={product.countInStock === 0}>
													<strong>
														Add to cart <FiShoppingCart />
													</strong>
												</Button>
											</Col>
										</Row>
									</Col>
								)}
							</Row>
						</div>
						<div className='my-3'>
							<Row>
								<Col>Stocks:</Col>
								<Col>
									<strong>{product.countInStock === 0 ? 'Out of stock' : 'In stock'}</strong>
								</Col>
							</Row>
						</div>
						<div className='my-5' />
					</Col>
				</Row>
				<Row className='mt-5'>
					<Col md={6}>
						<h2>Reviews</h2>
						{product.reviews.length === 0 ? (
							<Alert variant='dark'>No reviews</Alert>
						) : (
							<ListGroup>
								{product.reviews.map((review) => (
									<ListGroup.Item key={review._id}>
										<Row>
											<Col sm={12} md={4}>
												<strong>{review.name}</strong>
											</Col>
											<Col sm={12} md={4}>
												<Rating value={review.rating} />
											</Col>
											<Col sm={12} md={4}>
												<p>{dateFormat(review.createdAt, 'mmm dd, yyyy')}</p>
											</Col>
										</Row>
										<p>"{review.comment}"</p>
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</Col>
					<Col md={6}>
						<h2>Write a Customer review</h2>
						{formError && <Alert variant='danger'>{formError}</Alert>}
						{uploadError && <Alert variant='danger'>{uploadError}</Alert>}
						{!userState.user ? (
							<Alert variant='dark'>
								Please <Link href='/login'>Login</Link> to write a review
							</Alert>
						) : (
							<Form onSubmit={handleSubmit(handleSubmitReview)}>
								<Row>
									<Col>
										<Form.Group controlId='rating'>
											<Form.Label>Rating</Form.Label>
											<Form.Control as='select' ref={register()} name='rating'>
												<option value={0}>Select Rating</option>
												<option value={1}>1 - Poor</option>
												<option value={2}>2 - Fair</option>
												<option value={3}>3 - Good</option>
												<option value={4}>4 - Very Good</option>
												<option value={5}>5 - Excellent</option>
											</Form.Control>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group controlId='comment'>
											<Form.Label>Comment</Form.Label>
											<Form.Control ref={register()} name='comment' as='textarea' rows={2} />
										</Form.Group>
									</Col>
								</Row>

								<Container className='text-right'>
									<Button type='submit' variant='outline-dark'>
										ADD REVIEW
									</Button>
								</Container>
							</Form>
						)}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ProductDetails;
