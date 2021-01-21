import authCheck from '../../hoc/authCheck';
import Head from 'next/head';

interface Props {}

const Todo: React.FC<Props> = () => {
  return (
    <div>
      <Head>
        <title>Todos</title>
      </Head>
      <h1>Patrick</h1>
    </div>
  );
};

export default authCheck(Todo);
