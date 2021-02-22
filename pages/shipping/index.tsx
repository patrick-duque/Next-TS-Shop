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
import { AddressState } from '../../store/address/addressReducer';

interface Props {}

interface ShippingData {
	address: string;
	city: string;
	postalCode: string;
}

const Shipping: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.address) as AddressState;
	const { address, city, postalCode } = state;
	const { register, handleSubmit, setValue } = useForm<ShippingData>();

	useEffect(() => {
		if (address && city && postalCode) {
			setValue('address', address);
			setValue('city', city);
			setValue('postalCode', postalCode);
		}
	}, []);

	const handleSubmitShippingForm = (data: ShippingData) => {
		dispatch(addAddress(data));
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
