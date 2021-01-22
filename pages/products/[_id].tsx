import { Fragment } from 'react';
import Link from 'next/link';
import { Container, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from '../../components/Head';
import Main from '../../components/Main';
import Router from 'next/router';
import { RiArrowGoBackLine } from 'react-icons/ri';

import products from '../../assets/products';
import Product from '../../models/product';
import { GetStaticProps, GetStaticPaths } from 'next';

interface Routes {
  params: { _id: string };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product: Product = products.find(product => product._id === params._id);
  return {
    props: { product }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const route: Routes[] = [];
  products.forEach(prod => {
    route.push({ params: { _id: prod._id } });
  });
  return {
    paths: route,
    fallback: false
  };
};

const ProductDetails = ({ product }) => {
  return (
    <Fragment>
      <Head title={product.name} />

      <Header />

      <Main>
        <Container fluid>
          <Link href='/'>
            <a>
              <RiArrowGoBackLine /> Go Back
            </a>
          </Link>
          <Container>
            <h1>Product</h1>
          </Container>
        </Container>
      </Main>

      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
