import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';
import { Fragment } from 'react';

import '../styles/globals.scss';
import '../styles/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </Fragment>
  );
}

export default MyApp;
