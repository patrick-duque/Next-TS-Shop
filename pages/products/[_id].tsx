import { useState } from 'react';
import axios from '../../helpers/api/axios';
import { useDispatch } from 'react-redux';
import { addToCartItem } from '../../store/user/userActions';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

//Components
import { Fragment } from 'react';
import Link from 'next/link';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Container, Row, Col, Image, Button, Alert, ListGroup, Form } from 'react-bootstrap';
import Head from '../../components/Head';
import Rating from '../../components/Rating';
import { IconContext } from 'react-icons';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

//Models
import { GetStaticProps, GetStaticPaths } from 'next';
import Product from '../../models/product';
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
	const [ formError, setFormError ] = useState<string>(null);
	const [ uploadError, setUploadError ] = useState<string>(null);
	const userState = useSelector<RootStore>(state => state.user) as UserState;
	const { register, handleSubmit } = useForm();

	const handleAddToCart = () => {
		dispatch(addToCartItem({ product: { ...product }, quantity: qty }));
	};

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
						<Image src={`http://localhost:5000${product.image}`} alt={product.name} fluid />
					</Col>
					<Col md={3}>
						<div>
							<h3>{product.name}</h3>
						</div>
						<div className='my-5'>
							<Rating value={product.rating} numOfReview={product.numReviews} />
						</div>
						<div className='my-5'>
							Description: <div className='mt-2'>{product.description}</div>
						</div>
					</Col>
					<Col md={3}>
						<div>
							<Row>
								<Col>Price:</Col>
								<Col>
									<strong>₱{product.price}</strong>
								</Col>
							</Row>
						</div>
						<div className='my-5'>
							<Row>
								<Col>Stocks:</Col>
								<Col>
									<strong>{product.countInStock === 0 ? 'Out of stock' : 'In stock'}</strong>
								</Col>
							</Row>
						</div>
						{product.countInStock > 0 && (
							<div className='my-5'>
								<Row>
									<Col sm={5}>Quantity:</Col>
									<Col sm={7} md={7} lg={7} className='text-center'>
										<Row>
											<Col sm={4}>
												<Button
													size='sm'
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
						<div className='my-5'>
							<Row>
								<Col>
									<Button
										variant='outline-dark'
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
				<Row>
					<Col md={6}>
						<h2>Reviews</h2>
						{product.reviews.length === 0 ? (
							<Alert variant='dark'>No reviews</Alert>
						) : (
							<ListGroup>
								{product.reviews.map(review => (
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
		</Fragment>
	);
};

export default ProductDetails;
