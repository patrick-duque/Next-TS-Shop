import React from 'react';
import styles from '../styles/Link.module.scss';

import { Nav } from 'react-bootstrap';

import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  href: string;
  children: JSX.Element;
}

const CustomLink: React.FC<Props> = ({ href, children }) => {
  const router = useRouter();

  let className = children.props.className || '';
  if (router.pathname === href) {
    className = `${className} selected`;
  }

  return (
    <Link href={href} passHref>
      <Nav.Link>{React.cloneElement(children, { className })}</Nav.Link>
    </Link>
  );
};

export default CustomLink;
