import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';

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
              <Nav.Link>Cart</Nav.Link>
            </Link>
            <Link href='/login'>
              <Nav.Link>Login</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
