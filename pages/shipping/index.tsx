import { FormEvent, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { addAddress } from '../../store/address/addressActions';

interface Props {}

const Shipping: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const savedAddress = useSelector<RootStore>(state => state.address.address) as string;
	const savedCity = useSelector<RootStore>(state => state.address.city) as string;
	const savedPostalCode = useSelector<RootStore>(state => state.address.postalCode) as string;
	const [ address, setAddress ] = useState<string>(savedAddress ? savedAddress : '');
	const [ city, setCity ] = useState<string>(savedCity ? savedCity : '');
	const [ postalCode, setPostalCode ] = useState<string>(savedPostalCode ? savedPostalCode : '');

	const handleSubmitShippingForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(addAddress({ address, city, postalCode }));
		Router.push('/payments');
	};

	return (
		<Fragment>
			<Head title='Shipping' />
			<CheckoutSteps step1 />
			<FormContainer>
				<h1>Shipping Info</h1>
				<Form onSubmit={handleSubmitShippingForm}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control
							type='text'
							placeholder='Enter address'
							value={address}
							onChange={e => setAddress(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control type='text' placeholder='Enter city' value={city} onChange={e => setCity(e.target.value)} />
					</Form.Group>

					<Form.Group controlId='postal-code'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter postal code'
							value={postalCode}
							onChange={e => setPostalCode(e.target.value)}
						/>
					</Form.Group>

					<Button type='submit'>Select Payment Method</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(Shipping);
