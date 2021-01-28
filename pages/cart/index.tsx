import { Fragment } from 'react';
import Head from '../../components/Head';
import { RootStore } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';

interface Props {}

const Cart: React.FC<Props> = () => {
  const cartItems = useSelector<RootStore>(state => state.cart.items);
  console.log(cartItems);

  return (
    <Fragment>
      <Head title='Cart' />
      <h1>Cart</h1>
    </Fragment>
  );
};

export default Cart;
