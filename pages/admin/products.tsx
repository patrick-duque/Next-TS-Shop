import { Fragment, useEffect } from 'react';
import { Table, Container, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import authCheck from '../../hoc/authCheck';

import { RootStore } from '../../store/index';
import axios from '../../helpers/api/axios';

import Head from '../../components/Head';
import { User } from '../../store/user/userReducer';
import ProductList from '../../components/ProductList';
import Spinner from '../../components/Spinner';
import { AdminState } from '../../store/admin/adminReducer';
import { getProductsByAdmin } from '../../store/admin/adminActions';

interface Props {}

const Products: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const userState = useSelector<RootStore>(state => state.user.user) as User;
	const { loading, error, users, success, products } = state;

	useEffect(
		() => {
			if (userState.isAdmin) {
				dispatch(getProductsByAdmin());
			} else {
				Router.push('/');
			}
		},
		[ dispatch ]
	);
	return (
		<Fragment>
			<Head title='Admin Product List' />
			<Container>
				<h1>Users</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
				<Modal show={loading} keyboard={false}>
					<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
						<Spinner />
					</Container>
				</Modal>
				<Table striped bordered hover responsive className='table-sm'>
					<thead className='text-center'>
						<tr>
							<th>ID</th>
							<th>PRODUCT</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th />
						</tr>
					</thead>
					<tbody>{products.map(product => <ProductList product={product} key={product._id} />)}</tbody>
				</Table>
			</Container>
		</Fragment>
	);
};

export default authCheck(Products);
