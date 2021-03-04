import { Container, Row, Col } from 'react-bootstrap';

interface Props {}

const Footer: React.FC<Props> = () => {
	return (
		<footer className='bg-primary'>
			<Container>
				<Row>
					<Col className='text-center py-3'>Copyright &copy; Tech Shop</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
