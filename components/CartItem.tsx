import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Image, Button, Col } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus, AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
import { addToCart, removeToCart } from '../store/cart/cartActions';
import { CartItem } from '../store/cart/cartReducer';

interface Props {
  item: CartItem;
}

const Item: React.FC<Props> = ({ item }) => {
  const dispatch = useDispatch();
  const [ qty, setQty ] = useState(item.quantity);

  const handleAddQuantity = () => {
    setQty(qty + 1);
    dispatch(addToCart({ ...item, quantity: 1 }));
  };

  const handleMinusQuantity = () => {
    setQty(qty - 1);
    dispatch(addToCart({ ...item, quantity: -1 }));
  };

  return (
    <Row>
      <Col md={6} lg={2}>
        <Image src={item.image} alt={item.name} fluid rounded />
      </Col>
      <Col md={3} lg={2}>
        <Link href={`/products/${item._id}`}>{item.name}</Link>
      </Col>
      <Col md={3} lg={2}>
        {item.price}
      </Col>
      <Col md={4} lg={4}>
        <Row>
          <Col sm={6} md={12} lg={5}>
            Quantity:
          </Col>
          <Col sm={6} md={12} lg={7}>
            <Row className='text-center'>
              <Col className='p-0'>
                <Button
                  size='sm'
                  variant='dark'
                  className='ml-sm-2 ml-md-0'
                  onClick={handleAddQuantity}
                  disabled={qty === item.countInStock}>
                  <AiOutlinePlus />
                </Button>
              </Col>
              <Col className='text-center d-flex justify-content-center align-items-center px-0'>
                <strong>{qty}</strong>
              </Col>
              <Col className='p-0'>
                <Button
                  size='sm'
                  variant='dark'
                  className='mr-sm-2 mr-md-0'
                  onClick={handleMinusQuantity}
                  disabled={qty <= 1}>
                  <AiOutlineMinus />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col lg={2}>
        <Button block variant='danger' className='text-dark' onClick={() => dispatch(removeToCart(item._id))}>
          <AiTwotoneDelete />
        </Button>
      </Col>
    </Row>
  );
};

export default Item;
