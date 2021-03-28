import { useForm } from 'react-hook-form';
import { Form, Col, Row, Button } from 'react-bootstrap';
import Router from 'next/router';

interface Props {}

interface SearchData {
	searchbox: string;
}

const SearchBox: React.FC<Props> = () => {
	const { register, handleSubmit } = useForm();

	const handleSearch = (data: SearchData) => {
		if (data.searchbox.trim() === '') {
			Router.push('/');
		} else {
			Router.push(`/search/${data.searchbox.trim()}?pageNumber=1`);
		}
	};

	return (
		<>
			<Form onSubmit={handleSubmit(handleSearch)}>
				<Row>
					<Col>
						<Form.Control placeholder='Search' name='searchbox' ref={register()} />
					</Col>
					<Col>
						<Button type='submit' variant='light'>
							SEARCH
						</Button>
					</Col>
				</Row>
			</Form>
		</>
	);
};

export default SearchBox;
