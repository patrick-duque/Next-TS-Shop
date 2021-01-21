import Head from 'next/head';

import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Next app</title>
      </Head>
      <Header />

      <main className='py-3'>
        <Container>
          <h1>Hello World</h1>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
