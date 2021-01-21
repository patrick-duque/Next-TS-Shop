import Link from './Link';

import { FiShoppingCart, FiUser } from 'react-icons/fi';
import { Container, Navbar, Nav } from 'react-bootstrap';

interface Props {}

const Header: React.FC<Props> = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Link href='/'>
          <Navbar.Brand>Pro-Shop</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Link href='/cart'>
              <Container>
                <FiShoppingCart /> Cart
              </Container>
            </Link>
            <Link href='/login'>
              <Container>
                <FiUser /> Login
              </Container>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
