import { render, screen, waitFor } from '@testing-library/react';
import Navbar from '../Navbar/Navbar';
import NavbarButtons from '../Navbar/NavbarButtons';

jest.mock('next/link', () => {
	//eslint-disable-next-line
	return ({ children, href }) => (
		<a href={href} data-testid={`link-${href}`}>
			{children}
		</a>
	);
});

jest.mock('next/image', () => {
	//eslint-disable-next-line
	return (props) => <img {...props} alt={props.alt} data-testid="image" />;
});

jest.mock('../Navbar/NavbarButtons', () => {
	return jest.fn(() => <div data-testid="navbar-buttons" />);
});

describe('Navbar', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the logo and NavbarButtons', async () => {
		render(await Navbar());

		checkIfLogoImageAndButtonsAreRendered();
	});

	const checkIfLogoImageAndButtonsAreRendered = async () => {
		await waitFor(() => {
			expect(screen.getByTestId('link-/')).toBeInTheDocument();
			expect(screen.getByTestId('image')).toBeInTheDocument();
			expect(screen.getByTestId('navbar-buttons')).toBeInTheDocument();
		});
	};
});
