import axios from '../helpers/api/axios';

import { Fragment, useState, useEffect } from 'react';
import Head from '../components/Head';
import Main from '../components/Main';
import Product from '../components/Product';
import { Row, Container, Col } from 'react-bootstrap';

import ProductModel from '../models/product';
import { GetServerSideProps } from 'next';

interface Props {
  products: ProductModel[];
}

const Home: React.FC<Props> = ({ products }) => {
  return (
    <Fragment>
      <Head title='Home' />
      <Main>
        <Container>
          <h1 className='text-white'>LATEST PRODUCTS</h1>
          <Row>
            {products.map(product => {
              return (
                <Col sm={12} md={6} lg={4} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
        </Container>
      </Main>
    </Fragment>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const products: ProductModel[] = (await axios.get('/products')).data;
  return {
    props: {
      products
    }
  };
};

export default Home;
