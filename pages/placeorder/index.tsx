import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { changePaymentMethod } from '../../store/payment/paymentActions';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, Col, Container, ListGroup, Image, Card, Row } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { CartItem } from '../../store/cart/cartReducer';

interface Props {}

const PlaceOrder: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const address = useSelector<RootStore>(state => state.address.address) as string;
	const city = useSelector<RootStore>(state => state.address.city) as string;
	const postalCode = useSelector<RootStore>(state => state.address.postalCode) as string;
	const paymentMethod = useSelector<RootStore>(state => state.payment.paymentMethod) as string;
	const cart = useSelector<RootStore>(state => state.user.user.cart) as CartItem[];

	const itemsPrice = cart.reduce((acc, curr) => +curr.product.price * curr.quantity + acc, 0);
	const shippingPrice = itemsPrice > 5000 ? 0 : 200;

	const handlePlaceOrder = () => {
		console.log(cart);
	};

	return (
		<Fragment>
			<Head title='Place Order' />
			<CheckoutSteps step1 step2 step3 />
			<Container>
				<h1>Place Order</h1>
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Address:</strong> {address}, {city}, {postalCode}
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Payment</h2>
								<p>
									<strong>Method:</strong> {paymentMethod}
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order {cart.length > 1 ? 'Items' : 'Item'}</h2>
								<ListGroup variant='flush'>
									{cart.map(item => (
										<ListGroup.Item key={item.product._id}>
											<Row>
												<Col md={2} lg={1}>
													<Image src={item.product.image} alt={item.product.name} fluid rounded />
												</Col>
												<Col>
													<Link href={`/products/${item.product._id}`}>{item.product.name}</Link>
												</Col>
												<Col md={4}>
													{item.quantity} x &#8369;{item.product.price} = &#8369;{+item.quantity * +item.product.price}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							</ListGroup.Item>
						</ListGroup>
					</Col>
					<Col md={4}>
						<Card>
							<ListGroup variant='flush'>
								<ListGroup.Item>
									<h2>Order Summary</h2>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Items</Col>
										<Col>&#8369;{itemsPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Shipping</Col>
										<Col>&#8369;{shippingPrice.toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Row>
										<Col>Total</Col>
										<Col>&#8369;{(shippingPrice + itemsPrice).toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>
									<Button block type='button' disabled={cart.length === 0} onClick={handlePlaceOrder}>
										PLACE ORDER
									</Button>
								</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default authCheck(PlaceOrder);
