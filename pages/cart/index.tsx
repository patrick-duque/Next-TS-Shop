import { Fragment } from 'react';
import Head from '../../components/Head';

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <Fragment>
      <Head title='Cart' />
      <h1>Cart</h1>
    </Fragment>
  );
};

export default Cart;
