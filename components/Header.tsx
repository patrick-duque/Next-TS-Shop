import Link from './Link';

import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Navbar, Nav } from 'react-bootstrap';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Navbar.Brand>Pro-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Link href='/cart' icon={<FiShoppingCart />} title='Cart' />
            <Link href='/login' icon={<FiUser />} title='Login' />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
