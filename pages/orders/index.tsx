import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, ListGroup, Row, Alert } from 'react-bootstrap';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import OrderItem from '../../components/OrderItem';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { OrdersFromDB } from '../../store/order/orderActionTypes';
import { getOrder } from '../../store/order/orderActions';

interface Props {}

const Order: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const error = useSelector<RootStore>(state => state.order.error) as string;
	const loading = useSelector<RootStore>(state => state.order.loading) as boolean;
	const orders = useSelector<RootStore>(state => state.order.orders) as OrdersFromDB[];

	useEffect(() => {
		dispatch(getOrder());
	}, []);

	let screen = (
		<Container>
			{orders.map(order => (
				<ListGroup key={order._id} className='mt-2'>
					<ListGroup.Item>
						{order.isPaid ? <Alert variant='success'>Paid</Alert> : <Alert variant='danger'>Not Paid</Alert>}
						<p>
							<strong>Delivery Address:</strong> {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
							{order.shippingAddress.postalCode}
						</p>
						<p>
							<strong>Payment Method:</strong> {order.paymentMethod}
						</p>
						<p>
							<strong>Paid:</strong> {order.isPaid ? 'Yes' : 'No'}
						</p>
						<p>
							<strong>Delivered:</strong> {order.isDelivered ? 'Yes' : 'No'}
						</p>
						<ListGroup>
							{order.orderItems.map(item => <OrderItem key={item.product._id} item={item} />)}
							<ListGroup.Item>
								<Row>
									<Col>
										<strong>Shipping Price:</strong>
									</Col>
									<Col />
									<Col>&#8369;{order.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										<strong>Total Price:</strong>
									</Col>
									<Col />
									<Col>&#8369;{order.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
						</ListGroup>
					</ListGroup.Item>
				</ListGroup>
			))}
		</Container>
	);

	if (loading) {
		screen = <Spinner />;
	}

	return (
		<Fragment>
			<Head title='Orders' />
			<Container>
				<h1>My Orders</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
				{screen}
			</Container>
		</Fragment>
	);
};

export default authCheck(Order);
