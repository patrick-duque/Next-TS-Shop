import { Fragment, FormEvent, useState, useEffect } from 'react';
import { Col, Row, Container, Button, Form, Alert } from 'react-bootstrap';
import authCheck from '../../hoc/authCheck';
import { useSelector, useDispatch } from 'react-redux';
import Head from '../../components/Head';
import { RootStore } from '../../store';
import { User } from '../../store/user/userReducer';
import { editUserAction } from '../../store/user/userActions';
import Router from 'next/router';

interface Props {}

const Profile: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const user = useSelector<RootStore>(state => state.user.user) as User;
  const error = useSelector<RootStore>(state => state.user.error) as string;
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');

  useEffect(
    () => {
      if (!user || !user.email || !user.name) {
        Router.push('/login');
      } else {
        setEmail(user.email);
        setName(user.name);
      }
    },
    [ user ]
  );

  const handleEditProfile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newName = name !== user.name ? name : user.name;
    const newEmail = email !== user.email ? email : user.email;
    const body = {
      email: newEmail,
      name: newName
    };
    dispatch(editUserAction(body));
  };

  return (
    <Fragment>
      <Head title='User Profile' />
      <Row className='w-100'>
        <Col sm={12} lg={3}>
          <Container>
            <h1>Profile</h1>

            <Form onSubmit={handleEditProfile}>
              {error && <Alert variant='danger'>{error}</Alert>}
              <Form.Group controlId='email'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
              </Form.Group>

              <Form.Group controlId='Name'>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={name} onChange={e => setName(e.target.value)} />
              </Form.Group>

              <div className='text-right'>
                <Button type='submit'>EDIT PROFILE</Button>
              </div>
            </Form>
          </Container>
        </Col>
        <Col>
          <Container>
            <h1>My Orders</h1>
          </Container>
        </Col>
      </Row>
    </Fragment>
  );
};

export default authCheck(Profile);
