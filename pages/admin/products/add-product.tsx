import { Fragment, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Form, Modal, Container, Alert } from 'react-bootstrap';
import { RootStore } from '../../../store';
import { AdminState } from '../../../store/admin/adminReducer';
import Head from '../../../components/Head';
import Spinner from '../../../components/Spinner';
import FormContainer from '../../../components/FormContainer';
import Product from '../../../models/product';
import authCheck from '../../../hoc/authCheck';
import { createProductByAdmin } from '../../../store/admin/adminActions';
import capitalize from '../../../helpers/capitalize';
import axios from '../../../helpers/api/axios';

interface Props {}

interface EditProductData extends Product {}

const AddProduct: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const { loading, error } = state;
	const [ uploading, setUploading ] = useState<boolean>(false);
	const [ componentError, setComponentError ] = useState<string>(null);
	const { register, handleSubmit, setValue } = useForm();

	const handleAddProduct = (data: EditProductData) => {
		if (!data.image) {
			setComponentError('Please add an image');
		} else {
			dispatch(
				createProductByAdmin({
					name: capitalize(data.name),
					_id: data._id,
					brand: capitalize(data.brand),
					category: capitalize(data.category),
					image: data.image,
					countInStock: +data.countInStock,
					price: +data.price,
					rating: 0,
					numReviews: 0,
					description: data.description,
					reviews: []
				})
			);
		}
	};

	const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('image', file);
		setUploading(true);

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			};
			const image = (await axios.post('/uploads', formData, config)).data;
			setValue('image', image);
			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	return (
		<Fragment>
			<Head title={`Add Product`} />
			<Modal show={loading} keyboard={false}>
				<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
					<Spinner />
				</Container>
			</Modal>
			<Container>
				<h1 className='text-capitalize'>Add New Product</h1>
			</Container>
			<FormContainer>
				<Form onSubmit={handleSubmit(handleAddProduct)}>
					{componentError && <Alert variant='danger'>{componentError}</Alert>}
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form.Group controlId='product-name'>
						<Form.Label>Product Name</Form.Label>
						<Form.Control type='text' name='name' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-brand'>
						<Form.Label>Brand</Form.Label>
						<Form.Control type='text' name='brand' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-category'>
						<Form.Label>Category</Form.Label>
						<Form.Control type='text' name='category' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-brand'>
						<Form.Label>Price</Form.Label>
						<Form.Control type='number' step={0.01} name='price' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-stock'>
						<Form.Label>Count in stock</Form.Label>
						<Form.Control type='number' name='countInStock' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-description'>
						<Form.Label>Description</Form.Label>
						<Form.Control as='textarea' name='description' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-image-upload'>
						<Form.Label>Image</Form.Label>
						<Form.Control type='text' name='image' ref={register({ required: true })} />
						<Form.File id='product-image-file' label='Choose file' custom onChange={handleUploadFile}>
							{uploading && <Spinner />}
						</Form.File>
					</Form.Group>

					<Button type='submit'>ADD NEW PRODUCT</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(AddProduct);
