import { signOut, useSession } from 'next-auth/react';
import NavbarButtons from '../NavbarButtons';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('next-auth/react', () => ({
	useSession: jest.fn(),
	signOut: jest.fn(),
}));

describe('NavbarButtons', () => {
	it('renders register and login button when not signed in', () => {
		useSession.mockReturnValue({ data: null });

		render(<NavbarButtons />);

		const register = screen.getByText(/Registrarse/i);
		const login = screen.getByText(/Login/i);
		expect(register).toBeInTheDocument();
		expect(login).toBeInTheDocument();
	});

	it('should not render register and login button when signed in', () => {
		useSession.mockReturnValue({
			data: {
				user: {
					email: 'foo@bar.com',
				},
			},
		});

		render(<NavbarButtons />);
		const register = screen.queryByText(/Registrarse/i);
		const login = screen.queryByText(/Login/i);
		expect(register).toBeNull();
		expect(login).toBeNull();
	});

	it('logged user email when signed in', () => {
		useSession.mockReturnValue({
			data: {
				user: {
					email: 'foo@bar.com',
				},
			},
		});

		render(<NavbarButtons />);

		const email = screen.getByText(/foo@bar.com/i);
		expect(email).toBeInTheDocument();
	});

	it('should call signOut when sign out button is clicked', async () => {
		useSession.mockReturnValue({
			data: {
				user: {
					email: 'foo@bar.com',
				},
			},
		});

		render(<NavbarButtons />);

		const menu = screen.getByText(/foo@bar.com/i);
		await userEvent.click(menu);

		await waitFor(() => screen.getByText(/Logout/i));

		const signOutButton = screen.getByText(/Logout/i);
		await userEvent.click(signOutButton);

		expect(signOut).toHaveBeenCalled();
	});
});
