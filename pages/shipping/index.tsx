import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { useForm } from 'react-hook-form';

import CheckoutSteps from '../../components/CheckoutSteps';
import { Form, Button } from 'react-bootstrap';
import Head from '../../components/Head';
import FormContainer from '../../components/FormContainer';
import authCheck from '../../hoc/authCheck';
import { RootStore } from '../../store';
import { addAddress } from '../../store/address/addressActions';

interface Props {}

interface ShippingData {
	address: string;
	city: string;
	postalCode: string;
}

const Shipping: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const savedAddress = useSelector<RootStore>(state => state.address.address) as string;
	const savedCity = useSelector<RootStore>(state => state.address.city) as string;
	const savedPostalCode = useSelector<RootStore>(state => state.address.postalCode) as string;
	const { register, handleSubmit, setValue } = useForm<ShippingData>();

	useEffect(() => {
		if (savedAddress && savedCity && savedPostalCode) {
			setValue('address', savedAddress);
			setValue('city', savedCity);
			setValue('postalCode', savedPostalCode);
		}
	}, []);

	const handleSubmitShippingForm = (data: ShippingData) => {
		const { address, city, postalCode } = data;
		dispatch(addAddress({ address, city, postalCode }));
		Router.push('/payments');
	};

	return (
		<Fragment>
			<Head title='Shipping' />
			<CheckoutSteps step1 />
			<FormContainer>
				<h1>Shipping Info</h1>
				<Form onSubmit={handleSubmit(handleSubmitShippingForm)}>
					<Form.Group controlId='address'>
						<Form.Label>Address</Form.Label>
						<Form.Control type='text' placeholder='Enter address' name='address' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='city'>
						<Form.Label>City</Form.Label>
						<Form.Control type='text' placeholder='Enter city' name='city' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='postal-code'>
						<Form.Label>Postal Code</Form.Label>
						<Form.Control
							type='number'
							placeholder='Enter postal code'
							name='postalCode'
							ref={register({ required: true })}
						/>
					</Form.Group>

					<Button type='submit'>Add Address</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(Shipping);
