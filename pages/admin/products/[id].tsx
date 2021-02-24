import { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
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
import { editProductByAdmin } from '../../../store/admin/adminActions';
import capitalize from '../../../helpers/capitalize';

interface Props {}

interface EditProductData extends Product {}

const EditProduct: React.FC<Props> = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const state = useSelector<RootStore>(state => state.admin) as AdminState;
	const { products, loading, error } = state;
	const { register, handleSubmit, setValue } = useForm();
	const product = products.find(prod => prod._id === router.query.id.toString());

	useEffect(
		() => {
			if (!product) {
				router.replace('/admin/products');
			} else {
				setValue('name', product.name);
				setValue('description', product.description);
				setValue('brand', product.brand);
				setValue('category', product.category);
				setValue('price', product.price);
				setValue('countInStock', product.countInStock);
				setValue('numReviews', product.numReviews);
				setValue('rating', product.rating);
			}
		},
		[ product ]
	);

	const handleEditProduct = (data: EditProductData) => {
		console.log(capitalize(data.name));
		// dispatch(editProductByAdmin(product._id, product));
	};

	return (
		<Fragment>
			<Head title={`Edit ${product.name}`} />
			<Modal show={loading} keyboard={false}>
				<Container style={{ height: '40vh' }} className='d-flex align-items-center justify-content-center'>
					<Spinner />
				</Container>
			</Modal>
			<Container>
				<h1 className='text-capitalize'>Edit {product.name}</h1>
			</Container>
			<FormContainer>
				<Form onSubmit={handleSubmit(handleEditProduct)}>
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

					<Form.Group controlId='product-rating'>
						<Form.Label>Rating</Form.Label>
						<Form.Control type='text' name='rating' ref={register({ required: true })} />
					</Form.Group>

					<Form.Group controlId='product-description'>
						<Form.Label>Description</Form.Label>
						<Form.Control as='textarea' name='description' ref={register({ required: true })} />
					</Form.Group>

					<Button type='submit'>Edit</Button>
				</Form>
			</FormContainer>
		</Fragment>
	);
};

export default authCheck(EditProduct);
