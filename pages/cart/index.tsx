import Head from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Main from '../../components/Main';

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <div>
      <Head title='Cart' />
      <Header />
      <Main>
        <h1>Cart</h1>
      </Main>
      <Footer />
    </div>
  );
};

export default Cart;
