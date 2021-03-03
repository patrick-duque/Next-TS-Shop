import { Fragment } from 'react';
import axios from '../helpers/api/axios';
import Link from 'next/link';
import Head from '../components/Head';
import Product from '../components/Product';
import { Row, Container, Col, Pagination } from 'react-bootstrap';

import { GetServerSideProps } from 'next';
import GetProductsData from '../models/getProductsData';

interface Props extends GetProductsData {}

const Home: React.FC<Props> = ({ products, pages, page }) => {
	const itemPage = Array.from(Array(pages).keys()); 
	return (
		<Fragment>
			<Head title='Home' />
			<Container>
				<h1>LATEST PRODUCTS</h1>
				<Row>
					{products.map(product => {
						return (
							<Col sm={12} md={6} lg={4} key={product._id}>
								<Product product={product} />
							</Col>
						);
					})}
				</Row>
				{pages > 1 && (
					<Container className='d-flex justify-content-end'>
						<Pagination>
							{itemPage.map(i => (
								<Link href={`/?pageNumber=${i + 1}`} key={i} passHref>
									<Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
								</Link>
							))}
						</Pagination>
					</Container>
				)}
			</Container>
		</Fragment>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const route = query.pageNumber ? `/products?pageNumber=${query.pageNumber}` : '/products';
	const data: GetProductsData = (await axios.get(route)).data;
	return {
		props: {
			...data
		}
	};
};

export default Home;
