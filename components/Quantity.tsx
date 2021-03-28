import { MouseEventHandler } from 'react';
import { Container, Button } from 'react-bootstrap';
import { TiMinus, TiPlus } from 'react-icons/ti';

import styles from '../styles/Quantity.module.scss';

interface Props {
	qty: number;
	countInStock: number;
	addQuantity: MouseEventHandler<HTMLElement>;
	minusQuantity: MouseEventHandler<HTMLElement>;
}

const Quantity: React.FC<Props> = ({ qty, addQuantity, minusQuantity, countInStock }) => {
	return (
		<Container fluid className={`${styles.Quantity} d-flex justify-content-left p-0`}>
			<Button
				className={styles.btnAdd}
				size='sm'
				variant='outline-light'
				onClick={addQuantity}
				disabled={qty === countInStock}>
				<span>
					<TiPlus />
				</span>
			</Button>
			<p className={`${styles.qty} m-0 px-3 d-flex align-items-center`}>{qty}</p>
			<Button className={styles.btnMinus} size='sm' variant='outline-light' onClick={minusQuantity} disabled={qty <= 1}>
				<span className=''>
					<TiMinus />
				</span>
			</Button>
		</Container>
	);
};

export default Quantity;
