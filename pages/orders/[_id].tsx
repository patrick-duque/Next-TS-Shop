import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from 'dateformat';
import { useRouter } from 'next/router';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from '../../helpers/api/axios';
import { Col, Container, ListGroup, Card, Row, Alert, Modal } from 'react-bootstrap';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import OrderItem from '../../components/OrderItem';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { OrdersFromDB } from '../../store/order/orderActionTypes';
import { PAY_ORDER_RESET } from '../../store/pay/payActionTypes';
import { payOrder } from '../../store/pay/payActions';

interface Props {}

const PayOrder: React.FC<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const [ clientId, setClientId ] = useState<string>('');
	const order = useSelector<RootStore>(
		state => state.order.orders.filter(order => order._id === router.query._id.toString())[0]
	) as OrdersFromDB;
	const success = useSelector<RootStore>(state => state.pay.success) as boolean;
	const payLoading = useSelector<RootStore>(state => state.pay.loading) as boolean;
	const payError = useSelector<RootStore>(state => state.pay.error) as string;

	useEffect(() => {
		const getClientId = async () => {
			const clientId = (await axios.get('/config/paypal')).data;
			setClientId(clientId);
		};

		if (!order || success) {
			dispatch({ type: PAY_ORDER_RESET });
		}

		getClientId();
	}, []);

	const handleSuccessPay = details => {
		const { status, id, update_time } = details;
		console.log(details);
		dispatch(
			payOrder(order._id, {
				email_address: details.payer.email_address,
				id,
				status,
				update_time
			})
		);
	};

	let paypalButton = <Spinner />;
	if (clientId !== '') {
		paypalButton = order.isPaid ? null : (
			<PayPalButton
				amount={order.totalPrice + order.shippingPrice}
				shippingPreference='NO_SHIPPING'
				onSuccess={handleSuccessPay}
				options={{ clientId, currency: 'PHP' }}
			/>
		);
	}

	return (
		<Fragment>
			<Head title='Pay Order' />
			<Container>
				<h1>Pay Order</h1>
				{payError && <Alert variant='danger'>{payError}</Alert>}
				<Modal show={payLoading}>
					<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
						<Spinner />
					</Container>
				</Modal>
				<Row>
					<Col md={8}>
						<ListGroup>
							<ListGroup.Item>
								<h2>Shipping</h2>
								<p>
									<strong>Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},
									{order.shippingAddress.postalCode}
								</p>
								{order.isDelivered ? (
									<Alert variant='success'>Delivered.</Alert>
								) : (
									<Alert variant='danger'>Not Delivered.</Alert>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Payment</h2>
								<p>
									<strong>Method:</strong> {order.paymentMethod}
								</p>
								{order.isPaid ? (
									<Alert variant='success'>Paid last {dateFormat(order.updatedAt, 'mmm dd, yyyy')}.</Alert>
								) : (
									<Alert variant='danger'>Not Paid.</Alert>
								)}
							</ListGroup.Item>
							<ListGroup.Item>
								<h2>Order {order.orderItems.length > 1 ? 'Items' : 'Item'}</h2>
								<ListGroup>{order.orderItems.map(item => <OrderItem key={item.product._id} item={item} />)}</ListGroup>
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
										<Col>&#8369;{order.shippingPrice.toFixed(2)}</Col>
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
