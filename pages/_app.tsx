import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
const Header = dynamic(() => import('../components/Header'), { ssr: false });
import Footer from '../components/Footer';
import Main from '../components/Main';
import store from '../store/index';

import '../styles/globals.scss';

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
