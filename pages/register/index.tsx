import { Fragment, useState, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Container, Button, Form, Alert } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import { RootStore } from '../../store';
import { registerAction } from '../../store/user/userActions';
import Link from 'next/link';

interface Props {}

const Register: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ confirmPassword, setConfirmPassword ] = useState<string>('');
  const [ name, setName ] = useState<string>('');
  const loading = useSelector<RootStore>(state => state.user.loading) as boolean;
  const error = useSelector<RootStore>(state => state.user.error) as string;

  const handleRegisterSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(registerAction({ email, password, name }));
  };

  let form = (
    <FormContainer>
      <Form onSubmit={handleRegisterSubmit}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='cpassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
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
