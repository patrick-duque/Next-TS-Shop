import { Fragment } from 'react';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Product from '../components/Product';
import { Row, Container, Col } from 'react-bootstrap';

import products from '../assets/products';

export default function Home() {
  return (
    <Fragment>
      <Head title='home' />
      <Header />

      <Main>
        <Container>
          <h1>Latest Products</h1>
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

      <Footer />
    </Fragment>
  );
}
