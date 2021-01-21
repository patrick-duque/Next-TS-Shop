import Head from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Props {}

const Cart: React.FC<Props> = () => {
  return (
    <div>
      <Head title='Cart' />
      <Header />
      <Footer />
    </div>
  );
};

export default Cart;
