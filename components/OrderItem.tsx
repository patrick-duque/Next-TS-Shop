import { Fragment } from 'react';
import Link from 'next/link';
import { ListGroup, Col, Row, Image } from 'react-bootstrap';
import { CartItem } from '../store/cart/cartReducer';

interface Props {
	item: CartItem;
}

const OrderItem: React.FC<Props> = ({ item }) => {
	return (
		<ListGroup.Item>
			<Row>
				<Col md={2} lg={1}>
					<Image src={item.product.image} alt={item.product.name} fluid rounded />
				</Col>
				<Col>
					<Link href={`/products/${item.product._id}`}>{item.product.name}</Link>
				</Col>
				<Col md={4}>
					{item.quantity} x &#8369;{item.product.price} = &#8369;{+item.quantity * +item.product.price}
				</Col>
			</Row>
		</ListGroup.Item>
	);
};

export default OrderItem;
