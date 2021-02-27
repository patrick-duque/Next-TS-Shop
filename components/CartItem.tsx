import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Image, Button, Col } from 'react-bootstrap';
import { AiOutlinePlus, AiOutlineMinus, AiTwotoneDelete } from 'react-icons/ai';
import Link from 'next/link';
import { addToCartItem, removeFromCart } from '../store/user/userActions';
import { CartItem } from '../store/cart/cartReducer';

interface Props {
	item: CartItem;
}

const Item: React.FC<Props> = ({ item }) => {
	const dispatch = useDispatch();
	const [ qty, setQty ] = useState(item.quantity);

	const handleAddQuantity = () => {
		setQty(qty + 1);
		dispatch(addToCartItem({ ...item, quantity: 1 }));
	};

	const handleMinusQuantity = () => {
		setQty(qty - 1);
		dispatch(addToCartItem({ ...item, quantity: -1 }));
	};

	return (
		<Row>
			<Col md={6} lg={2}>
				<Image src={`http://localhost:5000${item.product.image}`} alt={item.product.name} fluid rounded />
			</Col>
			<Col md={3} lg={2}>
				<Link href={`/products/${item.product._id}`}>{item.product.name}</Link>
			</Col>
			<Col md={3} lg={2}>
				₱{item.product.price}
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
									className='ml-sm-2 ml-md-0'
									onClick={handleAddQuantity}
									disabled={qty === item.product.countInStock}>
									<AiOutlinePlus />
								</Button>
							</Col>
							<Col className='text-center d-flex justify-content-center align-items-center px-0'>
								<strong>{qty}</strong>
							</Col>
							<Col className='p-0'>
								<Button size='sm' className='mr-sm-2 mr-md-0' onClick={handleMinusQuantity} disabled={qty <= 1}>
									<AiOutlineMinus />
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Col>
			<Col lg={2} className='d-flex justify-content-center align-items-center'>
				<Button variant='danger' onClick={() => dispatch(removeFromCart(item))} className='mt-2'>
					<AiTwotoneDelete />
				</Button>
			</Col>
		</Row>
	);
};

export default Item;
