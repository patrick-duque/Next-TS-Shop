import { Fragment, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Button, Form, Alert } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import Spinner from '../../components/Spinner';
import { RootStore } from '../../store';
import { registerAction } from '../../store/user/userActions';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

interface Props {}

interface RegisterData {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

const Register: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const [ formError, setFormError ] = useState<string>(null);
	const loading = useSelector<RootStore>(state => state.user.loading) as boolean;
	const error = useSelector<RootStore>(state => state.user.error) as string;
	const { register, handleSubmit, errors } = useForm<RegisterData>();

	const handleRegisterSubmit = (data: RegisterData) => {
		setFormError(null);
		if (data.password !== data.confirmPassword) {
			setFormError('Password do not match.');
		} else if (data.password.length < 8 || data.confirmPassword.length < 8) {
			setFormError('Password should be more than 8 characters');
		} else {
			dispatch(registerAction({ email: data.email, password: data.password, name: data.name }));
		}
	};

	let form = (
		<FormContainer>
			<Form onSubmit={handleSubmit(handleRegisterSubmit)}>
				{error && <Alert variant='danger'>{error}</Alert>}
				{formError && <Alert variant='danger'>{formError}</Alert>}
				<Form.Group controlId='email'>
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						ref={register({ required: true, pattern: /^\S+@\S+$/i })}
						name='email'
					/>
				</Form.Group>
				{errors.email && <Alert variant='danger'>Valid Email required</Alert>}

				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter your name'
						name='name'
						ref={register({ required: true, maxLength: 100 })}
					/>
				</Form.Group>
				{errors.name && <Alert variant='danger'>Name required</Alert>}

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						ref={register({ required: true, maxLength: 100 })}
						name='password'
					/>
				</Form.Group>
				{errors.password && <Alert variant='danger'>Password required</Alert>}

				<Form.Group controlId='cpassword'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						ref={register({ required: true, maxLength: 100 })}
						name='confirmPassword'
					/>
				</Form.Group>
				{errors.confirmPassword && <Alert variant='danger'>Please confirm your password</Alert>}
				<Row>
					<Col className='pt-4'>
						Already have an account? <Link href='/login'>Login</Link>
					</Col>
					<Col className='text-right'>
						<Button type='submit'>Create Account</Button>
					</Col>
				</Row>
			</Form>
		</FormContainer>
	);

	if (loading) {
		form = <Spinner />;
	}

	return (
		<Fragment>
			<Head title='Register' />
			<Container>
				<h1 className='text-right'>Register</h1>
			</Container>
			{form}
		</Fragment>
	);
};

export default Register;
