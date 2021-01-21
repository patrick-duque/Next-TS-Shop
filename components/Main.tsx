import { Container } from 'react-bootstrap';

interface Props {
  children: JSX.Element;
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <main className='py-3'>
      <Container>{children}</Container>
    </main>
  );
};

export default Main;
