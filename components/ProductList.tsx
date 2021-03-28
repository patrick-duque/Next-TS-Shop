import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Link from 'next/link';
import { deleteProductByAdmin } from '../store/admin/adminActions';
import ProductModel from '../models/product';

interface Props {
	product: ProductModel;
}

const ProductList: React.FC<Props> = ({ product }) => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);

	const handleDeleteProduct = () => {
		dispatch(deleteProductByAdmin(product._id));
		setShowModal(false);
	};

	console.log('rendering');

	return (
		<>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Are you sure you want to delete this product?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowModal(false)}>
						No
					</Button>
					<Button variant='success' onClick={handleDeleteProduct}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<tr>
				<td>{product._id}</td>
				<td>{product.name}</td>
				<td>{product.price}</td>
				<td>{product.category}</td>
				<td>{product.brand}</td>
				<td>
					<div className='d-flex justify-content-around'>
						<Link href={`/admin/products/${product._id}`}>
							<Button size='sm'>
								<FiEdit />
							</Button>
						</Link>
						<Button variant='danger' size='sm' onClick={() => setShowModal(true)}>
							Delete
						</Button>
					</div>
				</td>
			</tr>
		</>
	);
};

export default memo(ProductList);
