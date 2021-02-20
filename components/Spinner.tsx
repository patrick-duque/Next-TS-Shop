import { Spinner, Container } from 'react-bootstrap';

interface Props {}

const Loader: React.FC<Props> = () => {
	return (
		<Container className='text-center'>
			<Spinner animation='grow' variant='light' role='status' style={{ height: '100px', width: '100px' }} />
		</Container>
	);
};

export default Loader;
