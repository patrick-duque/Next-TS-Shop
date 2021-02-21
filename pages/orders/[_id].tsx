import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from '../../helpers/api/axios';
import { Col, Container, ListGroup, Card, Row } from 'react-bootstrap';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import OrderItem from '../../components/OrderItem';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { CartItem } from '../../store/cart/cartReducer';
import { OrdersFromDB } from '../../store/order/orderActionTypes';

interface Props {}

const PayOrder: React.FC<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [ clientId, setClientId ] = useState<string>('');
	const order = useSelector<RootStore>(
		state => state.order.orders.filter(order => order._id === router.query._id.toString())[0]
	) as OrdersFromDB;
	const cart = useSelector<RootStore>(state => state.user.user.cart) as CartItem[];

	const itemsPrice = cart.reduce((acc, curr) => +curr.product.price * curr.quantity + acc, 0);
	const shippingPrice = itemsPrice > 5000 ? 0 : 200;

	useEffect(() => {
		const getClientId = async () => {
			const clientId = (await axios.get('/config/paypal')).data;
			setClientId(clientId);
		};

		getClientId();
	}, []);

	let paypalButton = <Spinner />;
	if (clientId !== '') {
		paypalButton = (
			<PayPalButton
				amount={order.totalPrice}
				shippingPreference='NO_SHIPPING'
				onSuccess={(details, data) => {
					console.log({ details });
					console.log({ data });
				}}
				options={{ clientId }}
			/>
		);
	}

	return (
		<Fragment>
			<Head title='Place Order' />
			<Container>
				<h1>Pay Order</h1>
				<Row>
					<Col md={8}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
									{order.shippingAddress.postalCode}
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Payment</h2>
								<p>
									<strong>Method:</strong> {order.paymentMethod}
								</p>
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order {cart.length > 1 ? 'Items' : 'Item'}</h2>
								<ListGroup variant='flush'>
									{order.orderItems.map(item => <OrderItem key={item.product._id} item={item} />)}
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
										<Col>&#8369;{order.totalPrice.toFixed(2)}</Col>
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
										<Col>&#8369;{(order.totalPrice + order.shippingPrice).toFixed(2)}</Col>
									</Row>
								</ListGroup.Item>
								<ListGroup.Item>{paypalButton}</ListGroup.Item>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			</Container>
		</Fragment>
	);
};

export default authCheck(PayOrder);
