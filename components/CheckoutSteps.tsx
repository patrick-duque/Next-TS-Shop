import { Nav } from 'react-bootstrap';
import NavLink from './NavLink';
import { FiPackage, FiArchive, FiCreditCard } from 'react-icons/fi';

interface Props {
	step1?: boolean;
	step2?: boolean;
	step3?: boolean;
}

const CheckoutSteps: React.FC<Props> = ({ step1, step2, step3 }) => {
	return (
		<Nav className='justify-content-center mb-4'>
			<Nav.Item>
				{step1 ? (
					<NavLink href='/shipping' title='Shipping' icon={<FiPackage />} />
				) : (
					<Nav.Link disabled>Shipping</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step2 ? (
					<NavLink href='/payments' title='Payments' icon={<FiCreditCard />} />
				) : (
					<Nav.Link disabled>
						<FiCreditCard /> Payments
					</Nav.Link>
				)}
			</Nav.Item>

			<Nav.Item>
				{step3 ? (
					<NavLink href='/shipping/placeorder' title='Place Order' icon={<FiArchive />} />
				) : (
					<Nav.Link disabled>Place Order</Nav.Link>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
