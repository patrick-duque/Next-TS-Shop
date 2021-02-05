import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Navbar, Nav, Image } from 'react-bootstrap';
import NavLink from './NavLink';
import Link from 'next/link';
import { RootStore } from '../store';

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
  const user = useSelector<RootStore>(state => state.user.user);

  let link = <NavLink href='/login' icon={<FiUser />} title='Login' />;

  if (user) {
    link = (
      <Fragment>
        <NavLink href='/cart' icon={<FiShoppingCart />} title='Cart' />
        <NavLink href='/login' icon={<FiUser />} title='Logout' />
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
    </header>
  );
};

export default Header;
