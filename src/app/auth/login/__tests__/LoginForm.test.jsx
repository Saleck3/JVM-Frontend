import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '../components/LoginForm';
import { login } from '@/app/shared/actions/auth';

jest.mock('../../../shared/actions/auth.ts', () => ({
	login: jest.fn(),
}));

jest.mock('react-dom', () => ({
	...jest.requireActual('react-dom'),
	useFormState: () => [{}, jest.fn()],
	useFormStatus: () => ({ pending: false }),
}));

beforeEach(() => {
	login.mockClear();
});

describe('LoginForm component', () => {
	it('renders LoginForm correctly', () => {
		render(<LoginForm />);

		checkIfInputsAreRendered();
	});

	it('submits form with valid data', async () => {
		login.mockResolvedValueOnce({});

		render(<LoginForm />);

		await fillEmail('juani@gmail.com');
		await fillPassword('superpassword123');
		await clickSubmitButton();

		checkIfNoErrorDisplayed();
	});

	it('shows error messages for empty fields', async () => {
		render(<LoginForm />);

		await clickSubmitButton();
		expect(login).not.toHaveBeenCalled();
	});

	const fillEmail = async (email) => {
		const emailInput = screen.getByPlaceholderText(/juani@gmail.com/i);
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, email);
	};

	const fillPassword = async (password) => {
		const passwordInput = screen.getByPlaceholderText(/superpassword123/i);
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, password);
	};

	const clickSubmitButton = async () => {
		const submitButton = screen.getByRole('button', {
			name: /Iniciar sesión/i,
		});

		await userEvent.click(submitButton);
	};

	const checkIfInputsAreRendered = () => {
		expect(screen.getByPlaceholderText(/juani@gmail.com/i)).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/superpassword123/i)
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Iniciar sesión/i })
		).toBeInTheDocument();
		expect(
			screen.getByText(/¿No tenés cuenta\? Registrate!/i)
		).toBeInTheDocument();
	};

	const checkIfNoErrorDisplayed = () => {
		login();
		expect(login).toHaveBeenCalled();
		expect(screen.queryByText(/text-red-700/i)).not.toBeInTheDocument();
	};
});
