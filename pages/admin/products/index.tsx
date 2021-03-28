import { useEffect } from 'react';
import { Table, Container, Alert, Modal, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { IconContext } from 'react-icons';
import { RiAddFill } from 'react-icons/ri';

import authCheck from '../../../hoc/authCheck';

import { RootStore } from '../../../store/index';

import Head from '../../../components/Head';
import { User } from '../../../store/user/userReducer';
import ProductList from '../../../components/ProductList';
import Spinner from '../../../components/Spinner';
import { AdminState } from '../../../store/admin/adminReducer';
import { createProductByAdmin, getProductsByAdmin } from '../../../store/admin/adminActions';

interface Props {}

const Products: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>((state) => state.admin) as AdminState;
	const userState = useSelector<RootStore>((state) => state.user.user) as User;
	const { loading, error, users, success, products } = state;

	useEffect(() => {
		if (userState.isAdmin) {
			dispatch(getProductsByAdmin());
		} else {
			Router.push('/');
		}
	}, [dispatch]);

	return (
		<>
			<Head title='Admin Product List' />
			<Container>
				<Row>
					<Col>
						<h1>Products</h1>
					</Col>
					<Col className='text-right'>
						<Button variant='outline-dark' onClick={() => Router.push('/admin/products/add-product')}>
							<IconContext.Provider value={{ size: '1.45em' }}>
								<RiAddFill />
							</IconContext.Provider>
							ADD PRODUCT
						</Button>
					</Col>
				</Row>
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
							<th>PRODUCT</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<ProductList product={product} key={product._id} />
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default authCheck(Products);
