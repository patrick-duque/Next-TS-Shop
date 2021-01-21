import React from 'react';
import styles from '../styles/Link.module.scss';

import { Nav, Container } from 'react-bootstrap';

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
          {icon}
          <span className='mx-2'>{title}</span>
        </Container>
      </Nav.Link>
    </Link>
  );
};

export default NavLink;
