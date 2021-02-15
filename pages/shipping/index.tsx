import { FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';

interface Props {}

const Shipping: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const [ address, setAddress ] = useState<string>('');
  const [ city, setCity ] = useState<string>('');
  const [ postalCode, setPostalCode ] = useState<string>('');

  const handleSubmitShippingForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Head title='Ship' />
      <FormContainer>
        <Form onSubmit={handleSubmitShippingForm}>
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' placeholder='Enter address' value={address} />
          </Form.Group>

          <Form.Group controlId='city'>
            <Form.Label>City</Form.Label>
            <Form.Control type='text' placeholder='Enter city' value={city} />
          </Form.Group>

          <Form.Group controlId='postal-code'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control type='number' placeholder='Enter postal code' value={postalCode} />
          </Form.Group>

          <Button type='submit'>Place Order</Button>
        </Form>
      </FormContainer>
    </Fragment>
  );
};

export default authCheck(Shipping);
