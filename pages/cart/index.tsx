import Head from '../../components/Head';
import { RootStore } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Alert, Container, ListGroup, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

import Item from '../../components/CartItem';

import authCheck from '../../hoc/authCheck';
import { UserState } from '../../store/user/userReducer';

interface Props {}

const Cart: React.FC<Props> = () => {
	const state = useSelector<RootStore>((state) => state.user) as UserState;
	const { user, error } = state;
	const cartItems = user ? user.cart : [];
	const router = useRouter();

	return (
		<>
			<Head title='Cart' />
			<Container>
				<Row>
					<Col xs={12} md={8} lg={9}>
						<h1>
							<strong>Shopping Cart</strong>
						</h1>
						{error && <Alert variant='danger'>{error}</Alert>}
						<Row className='mt-5'>
							<Col xs={6} className='d-none d-lg-block'>
								<p className='text-muted text-center'>
									<strong>PRODUCT</strong>
								</p>
							</Col>
							<Col className='d-none d-lg-block'>
								<Row>
									<Col xs={5}>
										<p className='text-muted'>
											<strong>QUANTITY</strong>
										</p>
									</Col>
									<Col>
										<p className='text-muted'>
											<strong>PRICE</strong>
										</p>
									</Col>
								</Row>
							</Col>
						</Row>
						{cartItems.length === 0 ? (
							<Alert variant='info'>Your Cart is Empty</Alert>
						) : (
							<ListGroup>
								{cartItems.map((item) => (
									<ListGroup.Item key={item.product._id}>
										<Item item={item} />
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</Col>
					<Col xs={12} md={4} lg={3}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h4>Subtotal: ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h4>
								<h2 className='text-right my-4'>
									₱{cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
								</h2>
								<Button
									block
									disabled={cartItems.reduce((acc, item) => acc + item.quantity, 0) === 0}
									onClick={() => router.push('/shipping')}>
									PROCEED TO CHECKOUT
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default authCheck(Cart);
