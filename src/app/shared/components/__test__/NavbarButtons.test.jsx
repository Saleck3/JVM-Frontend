import { signOut, useSession } from 'next-auth/react';
import NavbarButtons from '../../components/Navbar/NavbarButtons';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(),
	signOut: jest.fn(),
}));

describe('NavbarButtons Component', () => {
	it('should render register and login button when not signed in', () => {
		useSession.mockReturnValue({ data: null });

		render(<NavbarButtons />);

		checkUnsignedUserNavbarButtons();
	});

	it('should not render register and login button when signed in', () => {
		const mockedUser = {
			id: 1,
			name: 'mockedUser',
			email: 'foo@bar.com',
			players: null,
			accessToken: 'string',
		};

		render(<NavbarButtons user={mockedUser} />);
		checkSignedInNavbarButtons();
	});

	it('should display the logged user email when signed in', () => {
		const userEmail = 'foo@bar.com';
		const mockedUser = {
			id: 1,
			name: 'mockedUser',
			email: userEmail,
			players: null,
			accessToken: 'string',
		};

		render(<NavbarButtons user={mockedUser} />);
		checkLoggedUserEmailRender(userEmail);
	});

	it('should call signOut when sign out button is clicked', async () => {
		const userEmail = 'foo@bar.com';
		const mockedUser = {
			id: 1,
			name: 'mockedUser',
			email: userEmail,
			players: null,
			accessToken: 'string',
		};

		render(<NavbarButtons user={mockedUser} />);

		await openUserMenu();
		await waitForSignOut();
		await clickOnSignOutButton();

		expect(signOut).toHaveBeenCalled();
	});
});

const checkUnsignedUserNavbarButtons = () => {
	const register = screen.getByText(/Registrarse/i);
	const login = screen.getByText(/Login/i);
	expect(register).toBeInTheDocument();
	expect(login).toBeInTheDocument();
};

const checkSignedInNavbarButtons = () => {
	const register = screen.queryByText(/Registrarse/i);
	const login = screen.queryByText(/Login/i);
	expect(register).toBeNull();
	expect(login).toBeNull();
};

const checkLoggedUserEmailRender = (userEmail) => {
	const email = screen.getByText(new RegExp(userEmail, 'i'));
	expect(email).toBeInTheDocument();
};

const openUserMenu = async () => {
	const menu = screen.getByText(/foo@bar.com/i);
	await userEvent.click(menu);
};

const clickOnSignOutButton = async () => {
	const signOutButton = screen.getByText(/Logout/i);
	await userEvent.click(signOutButton);
};

const waitForSignOut = async () => {
	await waitFor(() => screen.getByText(/Logout/i));
};
