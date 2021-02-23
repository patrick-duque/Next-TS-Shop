import { Fragment, FormEvent, useState, useEffect } from 'react';
import { Col, Row, Container, Button, Form, Alert } from 'react-bootstrap';
import authCheck from '../../hoc/authCheck';
import { useSelector, useDispatch } from 'react-redux';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import { RootStore } from '../../store';
import { UserState } from '../../store/user/userReducer';
import { editUserAction } from '../../store/user/userActions';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

interface Props {}

interface ProfileData {
	name: string;
	email: string;
}

const Profile: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.user) as UserState;
	const { loading, error, user } = state;
	const { register, handleSubmit, setValue } = useForm<ProfileData>();

	useEffect(
		() => {
			if (!user || !user.email || !user.name) {
				Router.push('/login');
			} else {
				setValue('email', user.email);
				setValue('name', user.name);
			}
		},
		[ user ]
	);

	const handleEditProfile = (data: ProfileData) => {
		const newName = data.name !== '' ? data.name : user.name;
		const newEmail = data.email !== '' ? data.email : user.email;
		const body = {
			email: newEmail,
			name: newName
		};
		dispatch(editUserAction(body));
	};

	let editForm = <Spinner />;

	if (!loading) {
		editForm = (
			<Form onSubmit={handleSubmit(handleEditProfile)}>
				{error && <Alert variant='danger'>{error}</Alert>}
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control type='email' name='email' ref={register({ required: true })} />
				</Form.Group>

				<Form.Group controlId='Name'>
					<Form.Label>Name</Form.Label>
					<Form.Control type='text' name='name' ref={register({ required: true })} />
				</Form.Group>

				<div className='text-right'>
					<Button type='submit'>EDIT PROFILE</Button>
				</div>
			</Form>
		);
	}

	return (
		<Fragment>
			<Head title='User Profile' />
			<Row className='w-100'>
				<Col>
					<Container>
						<h1>Profile</h1>
						<Container>
							<Row>
								<Col sm={3}>
									<h2>Name:</h2>
								</Col>
								<Col sm={3}>
									<h3>{user && user.name}</h3>
								</Col>
							</Row>
							<Row>
								<Col sm={3}>
									<h2>Email:</h2>
								</Col>
								<Col sm={3}>
									<h3>{user && user.email}</h3>
								</Col>
							</Row>
						</Container>
					</Container>
				</Col>
				<Col sm={12} lg={3}>
					<Container>
						<h1>Edit Profile</h1>
						{editForm}
					</Container>
				</Col>
			</Row>
		</Fragment>
	);
};

export default authCheck(Profile);
