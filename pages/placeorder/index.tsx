import { FormEvent, Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { changePaymentMethod } from '../../store/payment/paymentActions';
import { useForm } from 'react-hook-form';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Form, Button, Col } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';

interface Props {}

const PlaceOrder: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const address = useSelector<RootStore>(state => state.address.address) as string;
	const userMethod = useSelector<RootStore>(state => state.payment.paymentMethod) as string;
	const { register, handleSubmit, errors } = useForm();

	useEffect(() => {
		if (!address) {
			Router.push('/shipping');
		}
	}, []);

	const handleSubmitPaymentMethod = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// dispatch(changePaymentMethod(paymentMethod));
		Router.push('/placeorder');
	};

	return (
		<Fragment>
			<Head title='Place Order' />
			<CheckoutSteps step1 step2 step3 />
			<FormContainer>
				<h1>Place my Order</h1>
				<Form onSubmit={handleSubmitPaymentMethod}>
					<Form.Group controlId='city'>
						<Form.Label as='legend'>Payment Method</Form.Label>
					</Form.Group>

					<Button className='mt-3' type='submit'>
						Select Payment Method
					</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(PlaceOrder);
