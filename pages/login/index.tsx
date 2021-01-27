import { Fragment } from 'react';
import Head from '../../components/Head';

interface Props {}

const Login: React.FC<Props> = () => {
  return (
    <Fragment>
      <Head title='Login' />
      <h1>Login</h1>
    </Fragment>
  );
};

export default Login;
