import { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Head from '../../components/Head';
import Main from '../../components/Main';
import Router from 'next/router';

const ProductDetails = () => {
  console.log(Router.router.query);
  return (
    <Fragment>
      <Head title={Router.router.query._id as string} />
      <Header />

      <Main>
        <Container>
          <h1>Product</h1>
        </Container>
      </Main>

      <Footer />
    </Fragment>
  );
};

export default ProductDetails;
