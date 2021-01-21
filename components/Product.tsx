import { Card } from 'react-bootstrap';
import Link from 'next/link';

import ProductModel from '../models/product';

import path from 'path';

interface Props {
  product: ProductModel;
}

const Product: React.FC<Props> = ({ product }) => {
  return (
    <Card>
      <Link href={`/products/${product._id}`}>
        <Card.Img variant='top' src={path.join(__dirname, `${product.image}`)} />
      </Link>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
