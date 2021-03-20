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
			<Col className='d-flex align-items-center'>
				{createStar(value)}
				{createStar(value - 1)}
				{createStar(value - 2)}
				{createStar(value - 3)}
				{createStar(value - 4)}
			</Col>
			{!(numOfReview === 0) &&
			numOfReview && (
				<Col className='d-flex justify-content-end justify-content-md-start align-items-end'>
					<p className='m-0'>
						<span>{numOfReview > 1 ? `${numOfReview} reviews` : `${numOfReview} review`}</span>
					</p>
				</Col>
			)}
			{numOfReview === 0 && (
				<Col className='d-flex justify-content-end justify-content-md-start align-items-end'>
					<p className='m-0'>
						<span>0 review</span>
					</p>
				</Col>
			)}
		</Row>
	);
};

export default Rating;
