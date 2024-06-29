import { render, screen, waitFor } from '@testing-library/react';
import NavbarButtons from '../Navbar/NavbarButtons';
import { getLoggedUser } from '../../../../lib/sessionUtils';

jest.mock('../../../../lib/sessionUtils', () => ({
	getLoggedUser: jest.fn(),
}));

jest.mock('next/link', () => {
	//eslint-disable-next-line
	return ({ children, href }) => (
		<a href={href} data-testid={`link-${href}`}>
			{children}
		</a>
	);
});

jest.mock('../DropdownButton', () => {
	//eslint-disable-next-line
	return ({ label, title, items }) => (
		<div data-testid="dropdown-button">
			<span>{title}</span>
			{items.map((item) => (
				<a key={item.href} href={item.href}>
					{item.label}
				</a>
			))}
		</div>
	);
});

describe('NavbarButtons', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders login and register buttons when user is not logged in', async () => {
		getLoggedUser.mockResolvedValueOnce(null);

		render(await NavbarButtons());

		await checkIfLoginAndRegisterButtonsAreRendered();
	});

	it('renders dropdown button when user is logged in', async () => {
		getLoggedUser.mockResolvedValueOnce('John Doe');

		render(await NavbarButtons());

		await checkIfLoggedButtonsAreRendered();
	});

	const checkIfLoginAndRegisterButtonsAreRendered = async () => {
		await waitFor(() => {
			expect(screen.getByText('Registrarse')).toBeInTheDocument();
			expect(screen.getByText('Login')).toBeInTheDocument();
		});
	};

	const checkIfLoggedButtonsAreRendered = async () => {
		await waitFor(() => {
			expect(screen.getByText('Jugadores')).toBeInTheDocument();
			expect(screen.getByText('Módulos')).toBeInTheDocument();
		});
	};
});
