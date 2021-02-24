import { Fragment, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import ProductModel from '../models/product';

interface Props {
	product: ProductModel;
}

const ProductList: React.FC<Props> = ({ product }) => {
	const [ showModal, setShowModal ] = useState(false);
	return (
		<Fragment>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Are you sure you want to delete this product?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowModal(false)}>
						No
					</Button>
					<Button variant='success'>Yes</Button>
				</Modal.Footer>
			</Modal>
			<tr>
				<td>{product._id}</td>
				<td>{product.name}</td>
				<td>{product.price}</td>
				<td>{product.category}</td>
				<td>{product.brand}</td>
				<td>
					<Button variant='danger' size='sm' block onClick={() => setShowModal(true)}>
						Delete
					</Button>
				</td>
			</tr>
		</Fragment>
	);
};

export default ProductList;
