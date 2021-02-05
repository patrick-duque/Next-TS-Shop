import { FormEvent, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import Spinner from '../../components/Spinner';
import { Button, Form, Row, Col, Container, Alert } from 'react-bootstrap';
import Link from 'next/link';
import { loginAction } from '../../store/user/userActions';
import { RootStore } from '../../store/index';

interface Props {}

const Login: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [ email, setEmail ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const loading = useSelector<RootStore>(state => state.user.loading) as boolean;
  const error = useSelector<RootStore>(state => state.user.error) as string;

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  let form = (
    <FormContainer>
      <Form onSubmit={handleLoginSubmit}>
        {error && <Alert variant='danger'>{error}</Alert>}
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} />
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
        <Row>
          <Col className='pt-4'>
            New customer? <Link href='/register'>Register</Link>
          </Col>
          <Col className='text-right'>
            <Button type='submit'>Login</Button>
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
      <Head title='Login' />
      <Container>
        <h1 className='text-right'>Login</h1>
      </Container>
      {form}
    </Fragment>
  );
};

export default Login;
