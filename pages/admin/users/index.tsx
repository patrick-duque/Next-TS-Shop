import { useEffect } from 'react';
import { Table, Container, Alert, Modal, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import authCheck from '../../../hoc/authCheck';

import { RootStore } from '../../../store/index';
import { AdminState } from '../../../store/admin/adminReducer';

import Head from '../../../components/Head';
import Spinner from '../../../components/Spinner';
import { getAllUsers } from '../../../store/admin/adminActions';
import { User } from '../../../store/user/userReducer';
import UserList from '../../../components/UserList';

interface Props {}

const Users: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>((state) => state.admin) as AdminState;
	const userState = useSelector<RootStore>((state) => state.user.user) as User;
	const { loading, error, users, success } = state;

	useEffect(() => {
		if (userState.isAdmin) {
			dispatch(getAllUsers());
		} else {
			Router.push('/');
		}
	}, [dispatch]);

	return (
		<>
			<Head title='Admin User List' />
			<Container>
				<h1>Users</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
				<Toast show={success}>
					<Toast.Body>Successfully deleted profile.</Toast.Body>
				</Toast>
				<Modal show={loading} keyboard={false}>
					<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
						<Spinner />
					</Container>
				</Modal>
				<Table striped bordered hover responsive className='table-sm' variant='active'>
					<thead className='text-center'>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<UserList user={user} key={user._id} />
						))}
					</tbody>
				</Table>
			</Container>
		</>
	);
};

export default authCheck(Users);
