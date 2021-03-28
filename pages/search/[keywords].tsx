import axios from '../../helpers/api/axios';

import Head from '../../components/Head';
import Product from '../../components/Product';
import { Row, Container, Col, Pagination } from 'react-bootstrap';

import { GetServerSideProps } from 'next';
import Link from 'next/link';
import GetProductsData from '../../models/getProductsData';

interface Props extends GetProductsData {}

const QuerySearch: React.FC<Props> = ({ products, page, pages }) => {
	const itemPage = Array.from(Array(pages).keys());
	return (
		<>
			<Head title='Home' />
			<Container>
				<h1 className='text-white'>LATEST PRODUCTS</h1>
				<Row>
					{products.map((product) => {
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
							{itemPage.map((i) => (
								<Link href={`/?pageNumber=${i + 1}`} key={i} passHref>
									<Pagination.Item active={i + 1 === page}>{i + 1}</Pagination.Item>
								</Link>
							))}
						</Pagination>
					</Container>
				)}
			</Container>
		</>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params, query }) => {
	const data: GetProductsData = (
		await axios.get(`/products?keywords=${params.keywords}&pageNumber=${query.pageNumber}`)
	).data;
	return {
		props: {
			...data
		}
	};
};

export default QuerySearch;
