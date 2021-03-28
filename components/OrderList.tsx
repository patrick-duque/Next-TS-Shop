import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { GrSend } from 'react-icons/gr';
import { OrdersFromDB } from '../store/order/orderActionTypes';
import { deliverOrderByAdmin } from '../store/admin/adminActions';

interface Props {
	order: OrdersFromDB;
}

const OrderList: React.FC<Props> = ({ order }) => {
	const dispatch = useDispatch();
	const [showModalDeliver, setShowModalDeliver] = useState<boolean>(false);

	const handleDeliverOrder = () => {
		dispatch(deliverOrderByAdmin(order._id));
		setShowModalDeliver(false);
	};

	return (
		<>
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
				<td className='text-center'>{order.isDelivered ? <IoMdCheckmark /> : <IoMdClose />}</td>
				<td className='text-center'>{order.isPaid ? <IoMdCheckmark /> : <IoMdClose />}</td>
				<td className='text-right'>{order.totalPrice}</td>
				<td className='text-center'>
					{!order.isDelivered && (
						<Button size='sm' onClick={() => setShowModalDeliver(true)} variant='outline-dark'>
							<GrSend />
						</Button>
					)}
				</td>
			</tr>
		</>
	);
};

export default OrderList;
