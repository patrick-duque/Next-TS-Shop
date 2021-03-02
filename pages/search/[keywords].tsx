import axios from '../../helpers/api/axios';

import { Fragment } from 'react';
import Head from '../../components/Head';
import Product from '../../components/Product';
import { Row, Container, Col } from 'react-bootstrap';

import ProductModel from '../../models/product';
import { GetServerSideProps } from 'next';

interface Props {
	products: ProductModel[];
}

const QuerySearch: React.FC<Props> = ({ products }) => {
	return (
		<Fragment>
			<Head title='Home' />
			<Container>
				<h1 className='text-white'>LATEST PRODUCTS</h1>
				<Row>
					{products.map(product => {
						return (
							<Col sm={12} md={6} lg={4} key={product._id}>
								<Product product={product} />
							</Col>
						);
					})}
				</Row>
			</Container>
		</Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const products: ProductModel[] = (await axios.get(`/products?keywords=${params.keywords}`)).data;
	return {
		props: {
			products
		}
	};
};

export default QuerySearch;
