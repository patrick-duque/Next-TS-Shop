import React, { Fragment } from 'react';
import Head from '../../components/Head';
import { RootStore } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Row, Alert, Container, ListGroup } from 'react-bootstrap';
import { CartItem } from '../../store/cart/cartReducer';
import Link from 'next/link';

import Item from '../../components/CartItem';

interface Props {}

const Cart: React.FC<Props> = () => {
  const cartItems = useSelector<RootStore>(state => state.cart.items) as CartItem[];
  console.log(cartItems);

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
                  <ListGroup.Item key={item._id}>
                    <Item item={item} />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Subtotal: ({cartItems.reduce((acc, item) => acc + item.quantity, 0)}) items</h2>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Cart;
