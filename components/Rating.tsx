import styles from '../styles/Rating.module.scss';

import { IconContext } from 'react-icons';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { Row, Col } from 'react-bootstrap';

interface Props {
	value: number;
	numOfReview?: number;
}

const createStar = (value: number) => {
	let star: JSX.Element;
	if (value >= 1) {
		star = <BsStarFill />;
	} else if (value >= 0.5) {
		star = <BsStarHalf />;
	} else {
		star = <BsStar />;
	}
	return (
		<IconContext.Provider value={{ className: styles.star, size: '1.1em' }}>
			<span className='mx-1'>{star}</span>
		</IconContext.Provider>
	);
};

const Rating: React.FC<Props> = ({ numOfReview, value }) => {
	return (
		<Row className={`${styles.Rating} mt-auto`}>
			<Col sm={6} md={12} lg={12} xl={6} className='d-flex justify-content-center align-items-center'>
				{createStar(value)}
				{createStar(value - 1)}
				{createStar(value - 2)}
				{createStar(value - 3)}
				{createStar(value - 4)}
			</Col>
			{numOfReview && (
				<Col sm={6} md={12} lg={12} xl={6} className='d-flex justify-content-center align-items-center'>
					<span>{numOfReview > 1 ? `${numOfReview} reviews` : `${numOfReview} review`}</span>
				</Col>
			)}
		</Row>
	);
};

export default Rating;
