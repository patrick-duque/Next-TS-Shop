import React, { Fragment, useEffect } from 'react';
import Router from 'next/router';
import Head from '../../components/Head';
import { RootStore } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Alert, Container, ListGroup, Button } from 'react-bootstrap';
import { CartItem } from '../../store/cart/cartReducer';

import Item from '../../components/CartItem';

import authCheck from '../../hoc/authCheck';
import { User } from '../../store/user/userReducer';

interface Props {}

const Cart: React.FC<Props> = () => {
  const user = useSelector<RootStore>(state => state.user.user) as User;
  const cartItems = user ? user.cart : [];

  useEffect(
    () => {
      if (!user) {
        Router.push('/login');
      }
    },
    [ user ]
  );
  return (
    <Fragment>
      <Head title='Cart' />
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Alert variant='light'>Your Cart is Empty</Alert>
            ) : (
              <ListGroup>
                {cartItems.map(item => (
                  <ListGroup.Item key={item.product._id}>
                    <Item item={item} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h4>Subtotal: ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h4>
                <h2 className='text-right'>
                  ₱{cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
                </h2>
                <Button block disabled={cartItems.reduce((acc, item) => acc + item.quantity, 0) === 0}>
                  PROCEED TO CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default authCheck(Cart);
