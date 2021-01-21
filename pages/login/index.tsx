import Head from '../../components/Head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <div>
      <Head title='Login' />
      <Header />
      <Footer />
    </div>
  );
};

export default Login;
