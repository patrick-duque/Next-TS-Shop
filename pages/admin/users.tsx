import { Fragment, useEffect } from 'react';
import { Table, Button, Container, Alert, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { IoMdClose, IoMdCheckmark } from 'react-icons/io';
import Router from 'next/router';

import authCheck from '../../hoc/authCheck';

import { RootStore } from '../../store/index';
import { AdminState } from '../../store/admin/adminReducer';

import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import { getAllUsers } from '../../store/admin/adminActions';
import { User } from '../../store/user/userReducer';

interface Props {}

const Users: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const userState = useSelector<RootStore>(state => state.user.user) as User;
	const { loading, error, users } = state;

	useEffect(
		() => {
			if (userState.isAdmin) {
				dispatch(getAllUsers());
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
							<th>NAME</th>
							<th>EMAIL</th>
							<th>ADMIN</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td className='text-center'>{user.isAdmin ? <IoMdCheckmark /> : <IoMdClose />}</td>
								<td className='text-center'>
									<Button variant='danger' size='sm' block>
										Delete
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</Container>
		</Fragment>
	);
};

export default authCheck(Users);
