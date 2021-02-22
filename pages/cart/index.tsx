import React, { Fragment, useEffect } from 'react';
import Router from 'next/router';
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
	const state = useSelector<RootStore>(state => state.user) as UserState;
	const { user, error } = state;
	const cartItems = user ? user.cart : [];
	const router = useRouter();

	return (
		<Fragment>
			<Head title='Cart' />
			<Container>
				<Row>
					<Col md={8}>
						<h1>Shopping Cart</h1>
						{error && <Alert variant='danger'>{error}</Alert>}
						{cartItems.length === 0 ? (
							<Alert variant='light'>Your Cart is Empty</Alert>
						) : (
							<ListGroup>
								{cartItems.map(item => (
									<ListGroup.Item key={item.product._id}>
										<Item item={item} />
									</ListGroup.Item>
								))}
							</ListGroup>
						)}
					</Col>
					<Col md={4}>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<h4>Subtotal: ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h4>
								<h2 className='text-right'>
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
		</Fragment>
	);
};

export default authCheck(Cart);
