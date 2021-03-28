import { Form, Container, Row, Col } from 'react-bootstrap';

interface Props {
	children: any;
}

const FormContainer: React.FC<Props> = ({ children }) => {
	return (
		<Container>
			<Row>
				<Col xs={12} md={8} lg={6}>
					{children}
				</Col>
			</Row>
		</Container>
	);
};

export default FormContainer;
