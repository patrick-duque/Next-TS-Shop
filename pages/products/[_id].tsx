import axios from '../../helpers/api/axios';

//Components
import { Fragment } from 'react';
import Link from 'next/link';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Head from '../../components/Head';
import Rating from '../../components/Rating';
import { IconContext } from 'react-icons';

//Models
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import Product from '../../models/product';

interface Props {
  product: Product;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const product: Product = (await axios.get(`/products/${params._id}`)).data;
  return {
    props: { product }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products: Product[] = (await axios.get('/products')).data;
  const route = products.map(prod => ({ params: { _id: prod._id } }));
  return {
    paths: route,
    fallback: false
  };
};

const ProductDetails: React.FC<Props> = ({ product }) => {
  const stock = product.countInStock === 0;
  return (
    <Fragment>
      <Head title={product.name} />
      <Container fluid>
        <div className='my-3 mx-0'>
          <Link href='/'>
            <a>
              <IconContext.Provider value={{ size: '2em' }}>
                <RiArrowGoBackLine />
              </IconContext.Provider>
            </a>
          </Link>
        </div>
        <Row>
          <Col md={5} className='text-center'>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <div className='bg-dark'>
              <h3>{product.name}</h3>
            </div>
            <div className='bg-dark my-5'>
              <Rating value={product.rating} numOfReview={product.numReviews} />
            </div>
            <div className='bg-dark my-5'>
              Description: <div className='mt-2'>{product.description}</div>
            </div>
          </Col>
          <Col md={3}>
            <div className='bg-dark'>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>₱{product.price}</strong>
                </Col>
              </Row>
            </div>
            <div className='bg-dark my-5'>
              <Row>
                <Col>Stocks:</Col>
                <Col>
                  <strong>{stock ? 'Out of stock' : 'In stock'}</strong>
                </Col>
              </Row>
            </div>
            <div className='bg-dark my-5'>
              <Row>
                <Col>
                  <Button variant='primary' className='btn-block' disabled={stock}>
                    ADD TO CART
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ProductDetails;
