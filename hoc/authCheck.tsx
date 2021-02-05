import Router from 'next/router'; 
import { NextPageContext } from 'next'; 
import axios from '../helpers/api/axios'

const path = '/'; 

interface Context extends NextPageContext {}
/**
 * Check user authentication and authorization 
 * @returns {{user: null}}
 */
const checkUserAuthentication = async () => {
	const user = await axios.get(`/users/user`)
	return user.data.auth; 
};

const AuthCheck = WrappedComponent => {
  const hocComponent = ({ ...props }) => <WrappedComponent {...props } />

  hocComponent.getInitialProps = async (context: Context) => {
		const userAuth = await checkUserAuthentication(); 
    if (!userAuth) { 
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