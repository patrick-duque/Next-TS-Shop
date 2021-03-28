import { useState, useCallback, memo } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Image, Button, Col } from 'react-bootstrap';
import Link from 'next/link';
import { addToCartItem, removeFromCart } from '../store/user/userActions';
import { CartItem } from '../store/cart/cartReducer';

import Quantity from '../components/Quantity';

interface Props {
	item: CartItem;
}

const Item: React.FC<Props> = ({ item }) => {
	const dispatch = useDispatch();
	const [qty, setQty] = useState(item.quantity);

	const handleAddQuantity = useCallback(() => {
		setQty(qty + 1);
		dispatch(addToCartItem({ ...item, quantity: 1 }));
	}, [qty]);

	const handleMinusQuantity = useCallback(() => {
		setQty(qty - 1);
		dispatch(addToCartItem({ ...item, quantity: -1 }));
	}, [qty]);

	return (
		<Row>
			<Col xs={6} lg={2}>
				<Image
					src={`https://lit-mesa-58105.herokuapp.com${item.product.image}`}
					alt={item.product.name}
					fluid
					rounded
				/>
			</Col>
			<Col xs={6} lg={4} className='p-1'>
				<p className='text-muted m-0'>{item.product.category}</p>
				<Link href={`/products/${item.product._id}`} passHref>
					<a className='m-0'>{item.product.name}</a>
				</Link>
				<p className='subtitle'>Brand: {item.product.brand}</p>
			</Col>
			<Col xs={12} lg={6} className='d-flex align-items-center justify-content-between'>
				<div>
					<Quantity
						qty={item.quantity}
						addQuantity={handleAddQuantity}
						minusQuantity={handleMinusQuantity}
						countInStock={item.product.countInStock}
					/>
				</div>
				<h6>
					<strong>&#8369;{item.product.price}</strong>
				</h6>
				<Button variant='outline-gray' onClick={() => dispatch(removeFromCart(item))} className='mt-2'>
					Remove
				</Button>
			</Col>
		</Row>
	);
};

export default memo(Item);
