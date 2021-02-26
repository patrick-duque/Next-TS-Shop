import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiUserPlus, FiUserX, FiPackage, FiDatabase } from 'react-icons/fi';
import { Navbar, Nav, Image, Modal, Button, Col, Container, NavDropdown } from 'react-bootstrap';
import NavLink from './NavLink';
import Link from 'next/link';
import { RootStore } from '../store';
import { logoutAction } from '../store/user/userActions';
import { User } from '../store/user/userReducer';

const HomeButton = () => {
	return (
		<Link href='/' passHref>
			<Navbar.Brand>
				<Image src='/images/icons.png' /> Pro-Shop
			</Navbar.Brand>
		</Link>
	);
};

const Header: React.FC = () => {
	const user = useSelector<RootStore>(state => state.user.user) as User;
	const [ showLogoutModal, setShowLogoutModal ] = useState<boolean>(false);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logoutAction());
		setShowLogoutModal(false);
	};

	const handleShowModal = () => {
		setShowLogoutModal(true);
	};

	let link = (
		<Fragment>
			<NavLink href='/login' icon={<FiUser />} title='Login' />
			<NavLink href='/register' icon={<FiUserPlus />} title='Register' />
		</Fragment>
	);

	if (user) {
		link = (
			<Fragment>
				{user.isAdmin && (
					<Nav.Item className='mr-3'>
						<NavDropdown title='Manage' id='admin'>
							<NavDropdown.Item>
								<Link href='/admin/users'>
									<Container>
										<Col>
											<FiUser />
											<span className='mx-2'>Users</span>
										</Col>
									</Container>
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link href='/admin/products'>
									<Container>
										<Col>
											<FiDatabase />
											<span className='mx-2'>Products</span>
										</Col>
									</Container>
								</Link>
							</NavDropdown.Item>
							<NavDropdown.Item>
								<Link href='/admin/orders'>
									<Container>
										<Col>
											<FiPackage />
											<span className='mx-2'>Orders</span>
										</Col>
									</Container>
								</Link>
							</NavDropdown.Item>
						</NavDropdown>
					</Nav.Item>
				)}
				<Nav.Item className='mr-3'>
					<NavDropdown title={user.name} id='username'>
						<NavDropdown.Item>
							<Link href='/profile'>
								<Container>
									<Col>
										<FiUser />
										<span className='mx-2'>Profile</span>
									</Col>
								</Container>
							</Link>
						</NavDropdown.Item>
						<NavDropdown.Item>
							<Container onClick={handleShowModal}>
								<Col>
									<FiUserX />
									<span className='mx-2'>Logout</span>
								</Col>
							</Container>
						</NavDropdown.Item>
					</NavDropdown>
				</Nav.Item>
				<NavLink href='/cart' icon={<FiShoppingCart />} title='Cart' />
				<NavLink href='/orders' icon={<FiPackage />} title='Orders' />
			</Fragment>
		);
	}

	return (
		<header>
			<Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
				<HomeButton />
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>{link}</Nav>
				</Navbar.Collapse>
			</Navbar>
			<Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
				<Modal.Body>
					<Modal.Title>Are you sure you want to logout?</Modal.Title>
				</Modal.Body>
				<Modal.Footer>
					<Button variant='danger' onClick={() => setShowLogoutModal(false)}>
						No
					</Button>
					<Button variant='success' onClick={handleLogout}>
						Yes
					</Button>
				</Modal.Footer>
			</Modal>
		</header>
	);
};

export default Header;
