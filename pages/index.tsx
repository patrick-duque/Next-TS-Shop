import axios from '../helpers/api/axios';

import { Fragment, useState, useEffect } from 'react';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import Product from '../components/Product';
import { Row, Container, Col } from 'react-bootstrap';

import ProductModel from '../models/product';

export default function Home() {
  const [ products, setProducts ] = useState<ProductModel[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const response: { products: ProductModel[] } = (await axios.get('/products')).data;
      setProducts(response.products);
    };

    fetchProduct();
  }, []);

  return (
    <Fragment>
      <Head title='Home' />
      <Header />

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

      <Footer />
    </Fragment>
  );
}
