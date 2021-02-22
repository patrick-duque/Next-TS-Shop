import { Fragment, useEffect } from 'react';
import { Table, Button, Row, Col, Container, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { RootStore } from '../../store/index';
import { AdminState } from '../../store/admin/adminReducer';

import Head from '../../components/Head';
import Spinner from '../../components/Spinner';

interface Props {}

const Users: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const { loading, error, users } = state;

	return (
		<Fragment>
			<Head title='Admin User List' />
			<Container>
				<h1>Users</h1>
				{error && <Alert variant='danger'>{error}</Alert>}
			</Container>
		</Fragment>
	);
};

export default Users;
