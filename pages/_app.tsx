import { Provider } from 'react-redux';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Main from '../components/Main';

import store from '../store/index';

import '../styles/globals.scss';
import '../styles/bootstrap.min.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Header />
      <Main>
        <Component {...pageProps} />
      </Main>
      <Footer />
    </Provider>
  );
}

export default MyApp;
