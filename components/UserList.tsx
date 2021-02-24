import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { User } from '../store/user/userReducer';
import { deleteUserByAdmin } from '../store/admin/adminActions';

interface Props {
	user: User;
}

const UserList: React.FC<Props> = ({ user }) => {
	const dispatch = useDispatch();
	const [ showModal, setShowModal ] = useState<boolean>(false);

	const handleDeleteAccount = () => {
		dispatch(deleteUserByAdmin(user._id));
	};

	return (
		<Fragment>
			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header>
					<Modal.Title>Are you sure you want to delete this account?</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<p className='text-center'>After deactivating your account you cannot undo this action.</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowModal(false)}>
						No
					</Button>
					<Button variant='success' onClick={handleDeleteAccount}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
			<tr>
				<td>{user._id}</td>
				<td>{user.name}</td>
				<td>{user.email}</td>
				<td className='text-center'>{user.isAdmin ? <IoMdCheckmark /> : <IoMdClose />}</td>
				<td className='text-center'>
					<Button variant='danger' size='sm' block onClick={() => setShowModal(true)}>
						Delete
					</Button>
				</td>
			</tr>
		</Fragment>
	);
};

export default UserList;
