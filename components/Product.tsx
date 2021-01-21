import { Card, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Rating from './Rating';

import ProductModel from '../models/product';

import styles from '../styles/Product.module.scss';
import path from 'path';

interface Props {
  product: ProductModel;
}

const cutDescription = (desc: string) => {
  const newDesc = desc.split(' ');
  return newDesc.filter((dsc, index) => index < 15).join(' ');
};

const Product: React.FC<Props> = ({ product }) => {
  return (
    <Card className={`my-3 ${styles.Product}`}>
      <Link href={`/products/${product._id}`}>
        <Card.Img variant='top' src={path.join(__dirname, `${product.image}`)} className={styles.ProductImage} />
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className='my-2'>₱{product.price}</Card.Subtitle>
        <Card.Text>
          {cutDescription(product.description).split(' ').length > 14 ? (
            `${cutDescription(product.description)} ...`
          ) : (
            cutDescription(product.description)
          )}
        </Card.Text>
        <Row className='mt-auto'>
          <Col sm={6} md={12} lg={12} xl={6} className='d-flex justify-content-center align-items-center'>
            <Rating value={product.rating} />
          </Col>
          <Col sm={6} md={12} lg={12} xl={6} className='d-flex justify-content-center align-items-center'>
            <span>{product.numReviews} reviews</span>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Product;
