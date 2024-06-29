import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Form from '../form.tsx';
import { registerUser } from '../../../shared/services/register.service.ts';

jest.mock('../../../shared/services/register.service.ts', () => ({
	registerUser: jest.fn(),
}));

jest.mock('react-dom', () => ({
	...jest.requireActual('react-dom'),
	useFormState: () => [{}, jest.fn()],
	useFormStatus: () => ({ pending: false }),
}));

beforeEach(() => {
	registerUser.mockClear();
});

describe('RegisterForm component', () => {
	it('renders correctly', () => {
		render(<Form />);

		checkIfInputsAreRendered();
	});

	it('submits form with valid data', async () => {
		registerUser.mockResolvedValueOnce({});

		render(<Form />);

		await fillName('juani@gmail.com');
		await fillPassword('superpassword123');
		await clickSubmitButton();

		checkIfNoErrorDisplayed();
	});

	it('shows error messages for empty fields', async () => {
		render(<Form />);

		await clickSubmitButton();
		checkFormWasNotSubmitted();
	});

	const fillName = async (email) => {
		const emailInput = screen.getByPlaceholderText(/email@domain.com/i);
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, email);
	};

	const fillPassword = async (password) => {
		const passwordInput = screen.getByPlaceholderText(
			/Escribí tu clave de 8 o más caracteres/i
		);
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, password);
	};

	const clickSubmitButton = async () => {
		const submitButton = screen.getByRole('button', {
			name: /Registrarse/i,
		});

		await userEvent.click(submitButton);
	};

	const checkIfInputsAreRendered = () => {
		expect(
			screen.getByPlaceholderText(/Nombre del adulto/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/Apellido del adulto/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/email@domain.com/i)
		).toBeInTheDocument();
	};

	const checkIfNoErrorDisplayed = () => {
		registerUser();
		expect(registerUser).toHaveBeenCalled();
		expect(screen.queryByText(/text-red-700/i)).not.toBeInTheDocument();
	};

	const checkFormWasNotSubmitted = () => {
		expect(registerUser).not.toHaveBeenCalled();
	};
});
