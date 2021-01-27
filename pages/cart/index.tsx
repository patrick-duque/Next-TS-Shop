import { Fragment } from 'react';
import Head from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from '../../components/Main';

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <Fragment>
      <Head title='Cart' />
      <Main>
        <h1>Cart</h1>
      </Main>
    </Fragment>
  );
};

export default Cart;
