import styles from '../styles/Rating.module.scss';

import { IconContext } from 'react-icons';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface Props {
  value: number;
  text?: string;
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
      <span>{star}</span>
    </IconContext.Provider>
  );
};

const Rating: React.FC<Props> = ({ text, value }) => {
  return (
    <div className={styles.Rating}>
      {createStar(value)}
      {createStar(value - 1)}
      {createStar(value - 2)}
      {createStar(value - 3)}
      {createStar(value - 4)}
      <span>{text && text}</span>
    </div>
  );
};

export default Rating;
