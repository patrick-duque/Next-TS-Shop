import Router from 'next/router'; 
import { NextPageContext } from 'next';
import {useSelector} from 'react-redux'
import {RootStore} from '../store/index'

const path = '/'; 

interface Context extends NextPageContext {}
/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */
const checkUserAuthentication = () => {
  return useSelector<RootStore>(state => state.user.user)
};

const AuthCheck = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props } />;

  hocComponent.getInitialProps = async (context: Context) => {
		const userAuth = await checkUserAuthentication();
		
    // Are you an authorized user or not?
    if (!userAuth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: path,
        });
        context.res?.end();
      } else {
        Router.replace(path);
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({...context, auth: userAuth});
      return { ...wrappedProps, userAuth };
    }

    return { userAuth };
  };

  return hocComponent;
};

export default AuthCheck