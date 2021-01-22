import React from 'react';
import styles from '../styles/NavLink.module.scss';
import { IconContext } from 'react-icons';

import { Nav, Container, Col } from 'react-bootstrap';

import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  href: string;
  icon: JSX.Element;
  title: string;
}

const NavLink: React.FC<Props> = ({ href, icon, title }) => {
  const router = useRouter();

  let className = '';
  if (router.pathname === href) {
    className = styles.active;
  }

  return (
    <Link href={href} passHref>
      <Nav.Link className={className}>
        <Container>
          <Col>
            <IconContext.Provider
              value={{
                color: className === styles.active ? '#fff' : '#B8B8B9',
                size: className === styles.active ? '1.11em' : '1em'
              }}>
              {icon}
            </IconContext.Provider>
            <span className='mx-2'>{title}</span>
          </Col>
        </Container>
      </Nav.Link>
    </Link>
  );
};

export default NavLink;
