import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
  num: number;
}

export const getStaticProps: GetStaticProps = async context => {
  return {
    props: {
      num: Math.random()
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [ { params: { id: '1' } }, { params: { id: '2' } }, { params: { id: '3' } } ],
    fallback: false
  };
};

const SampleId: React.FC<Props> = ({ num }) => {
  const route = useRouter();
  const { id } = route.query;

  return (
    <div>
      <h1>{num}</h1>
      <Link href='/sample'>
        <a>click</a>
      </Link>
    </div>
  );
};

export default SampleId;
