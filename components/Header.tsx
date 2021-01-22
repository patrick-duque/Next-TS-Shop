import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Navbar, Nav } from 'react-bootstrap';
import NavLink from './NavLink';
import Link from 'next/link';

const HomeButton = () => {
  return (
    <Link href='/' passHref>
      <Navbar.Brand>Pro-Shop</Navbar.Brand>
    </Link>
  );
};

const Header: React.FC = () => {
  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <HomeButton />
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <NavLink href='/cart' icon={<FiShoppingCart />} title='Cart' />
            <NavLink href='/login' icon={<FiUser />} title='Login' />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
