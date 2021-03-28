import Product from './product';

export default interface GetProductsData {
	products: Product[];
	page: number;
	pages: number;
}
