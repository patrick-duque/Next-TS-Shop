import { FormEvent, Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { changePaymentMethod } from '../../store/payment/paymentActions';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Form, Button, Col } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';

interface Props {}

const Payment: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const address = useSelector<RootStore>(state => state.address.address);
	const userMethod = useSelector<RootStore>(state => state.payment.paymentMethod) as string;
	const [ paymentMethod, setPaymentMethod ] = useState<string>(userMethod ? userMethod : 'PayPal');

	useEffect(() => {
		if (!address) {
			Router.push('/shipping');
		}
	}, []);

	const handleSubmitPaymentMethod = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(changePaymentMethod(paymentMethod));
		Router.push('/placeorder');
	};

	return (
		<Fragment>
			<Head title='Payment' />
			<CheckoutSteps step1 step2 />
			<FormContainer>
				<h1>Payments</h1>
				<Form onSubmit={handleSubmitPaymentMethod}>
					<Form.Group controlId='city'>
						<Form.Label as='legend'>Payment Method</Form.Label>
					</Form.Group>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked={paymentMethod === 'PayPal'}
							onChange={e => setPaymentMethod(e.target.value)}
						/>
						<Form.Check
							type='radio'
							label='Stripe'
							id='stripe'
							name='paymentMethod'
							value='Stripe'
							checked={paymentMethod === 'Stripe'}
							onChange={e => setPaymentMethod(e.target.value)}
						/>
					</Col>

					<Button className='mt-3' type='submit'>
						Place Order
					</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(Payment);
