import { Container } from 'react-bootstrap';
import Head from '../components/Head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

export default function Home() {
  return (
    <div>
      <Head title='home' />
      <Header />

      <Main>
        <h1>Hello World</h1>
      </Main>

      <Footer />
    </div>
  );
}
