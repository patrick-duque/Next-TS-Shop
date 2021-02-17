import { FormEvent, Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../../components/CheckoutSteps';

import { Form, Button } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import Router from 'next/router';

interface Props {}

const Payment: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const address = useSelector<RootStore>(state => state.address.address);
	const [ paymendMethod, setPaymentMethod ] = useState<string>('PayPal');

	useEffect(() => {
		if (!address) {
			Router.push('/shipping');
		}
	}, []);

	const handleSubmitShippingForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Head title='Payment' />
			<CheckoutSteps step1 step2 />
			<FormContainer>
				<Form onSubmit={handleSubmitShippingForm}>
					<Form.Group controlId='city'>
						<Form.Label>Payment Method</Form.Label>
						{/* <Form.Control type='text' placeholder='Enter city' value={city} onChange={e => setCity(e.target.value)} /> */}
					</Form.Group>

					<Button type='submit'>Place Order</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(Payment);
