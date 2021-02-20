import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Button, Col, Container, ListGroup, Image, Card, Row, Modal, Alert } from 'react-bootstrap';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import OrderItem from '../../components/OrderItem';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';

import { addOrder } from '../../store/order/orderActions';
import { CartItem } from '../../store/cart/cartReducer';

interface Props {}

const PlaceOrder: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const address = useSelector<RootStore>(state => state.address.address) as string;
	const city = useSelector<RootStore>(state => state.address.city) as string;
	const postalCode = useSelector<RootStore>(state => state.address.postalCode) as string;
	const paymentMethod = useSelector<RootStore>(state => state.payment.paymentMethod) as string;
	const cart = useSelector<RootStore>(state => state.user.user.cart) as CartItem[];
	const error = useSelector<RootStore>(state => state.order.error) as string;
	const loading = useSelector<RootStore>(state => state.order.loading) as boolean;

	const itemsPrice = cart.reduce((acc, curr) => +curr.product.price * curr.quantity + acc, 0);
	const shippingPrice = itemsPrice > 5000 ? 0 : 200;

	const handlePlaceOrder = () => {
		dispatch(
			addOrder({
				orderItems: cart,
				paymentMethod,
				shippingAddress: { address, city, postalCode },
				totalPrice: itemsPrice,
				shippingPrice
			})
		);
	};

	return (
		<Fragment>
			<Head title='Place Order' />
			<CheckoutSteps step1 step2 step3 />
			<Modal show={loading} keyboard={false}>
				<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
					<Spinner />
				</Container>
			</Modal>
			<Container>
				<h1>Place Order</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
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
									{cart.map(item => <OrderItem key={item.product._id} item={item} />)}
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
