import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { OrdersFromDB } from '../store/order/orderActionTypes';
import { deliverOrderByAdmin } from '../store/admin/adminActions';

interface Props {
	order: OrdersFromDB;
}

const OrderList: React.FC<Props> = ({ order }) => {
	const dispatch = useDispatch();
	const [ showModal, setShowModal ] = useState<boolean>(false);
	const [ showModalDeliver, setShowModalDeliver ] = useState<boolean>(false);

	const handleDeleteOrder = () => {
		// dispatch(deleteUserByAdmin(user._id));
	};

	const handleDeliverOrder = () => {
		dispatch(deliverOrderByAdmin(order._id));
	};

	return (
		<Fragment>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Are you sure you want to delete this order?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowModal(false)}>
						No
					</Button>
					<Button variant='success' onClick={handleDeleteOrder}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<Modal show={showModalDeliver} onHide={() => setShowModalDeliver(false)}>
				<Modal.Header>
					<Modal.Title>Is this order delivered?</Modal.Title>
				</Modal.Header>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowModalDeliver(false)}>
						No
					</Button>
					<Button variant='success' onClick={handleDeliverOrder}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<tr>
				<td>{order._id}</td>
				<td>{order.isDelivered ? <IoMdCheckmark /> : <IoMdClose />}</td>
				<td>{order.isPaid ? <IoMdCheckmark /> : <IoMdClose />}</td>
				<td>{order.totalPrice}</td>
				<td>
					<div className='d-flex justify-content-around'>
						<Button size='sm' onClick={() => setShowModalDeliver(true)}>
							<FiEdit />
						</Button>
						<Button variant='danger' size='sm' onClick={() => setShowModal(true)}>
							Delete
						</Button>
					</div>
				</td>
			</tr>
		</Fragment>
	);
};

export default OrderList;
