import { Fragment, useEffect } from 'react';
import { Table, Container, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import authCheck from '../../../hoc/authCheck';

import { RootStore } from '../../../store/index';
import { AdminState } from '../../../store/admin/adminReducer';

import Head from '../../../components/Head';
import Spinner from '../../../components/Spinner';
import { getOrderByAdmin } from '../../../store/admin/adminActions';
import { User } from '../../../store/user/userReducer';
import OrderList from '../../../components/OrderList';

interface Props {}

const Orders: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const userState = useSelector<RootStore>(state => state.user.user) as User;
	const { loading, error, orders, success } = state;

	useEffect(
		() => {
			if (userState.isAdmin) {
				dispatch(getOrderByAdmin());
			} else {
				Router.push('/');
			}
		},
		[ dispatch ]
	);

	return (
		<Fragment>
			<Head title='Admin User List' />
			<Container>
				<h1>Orders</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
				<Modal show={loading} keyboard={false}>
					<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
						<Spinner />
					</Container>
				</Modal>
				<Table striped bordered hover responsive className='table-sm' variant='active'>
					<thead className='text-center'>
						<tr>
							<th>ID</th>
							<th>DELIVERED</th>
							<th>PAID</th>
							<th>TOTAL PRICE</th>
							<th />
						</tr>
					</thead>
					<tbody>{orders.map(order => <OrderList order={order} key={order._id} />)}</tbody>
				</Table>
			</Container>
		</Fragment>
	);
};

export default authCheck(Orders);
