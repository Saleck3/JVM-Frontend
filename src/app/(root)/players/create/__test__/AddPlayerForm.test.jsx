import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddPlayerForm from '../components/AddPlayerForm';
import { useFormState } from 'react-dom';

jest.mock('react-dom', () => ({
	...jest.requireActual('react-dom'),
	useFormState: jest.fn(),
	useFormStatus: () => ({ pending: false }),
}));

const initialFormState = {
	fieldValues: { playerName: '', birthDate: '' },
	fieldErrors: {},
	reqError: null,
};

beforeEach(() => {
	useFormState.mockReturnValue([initialFormState, jest.fn()]);
});

describe('AddPlayerForm component', () => {
	it('renders AddPlayerForm correctly', () => {
		render(<AddPlayerForm />);

		expect(
			screen.getByPlaceholderText(/Nombre del jugador/i)
		).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText(/Fecha de nacimiento/i)
		).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /Crear jugador/i })
		).toBeInTheDocument();
	});

	it('submits form with valid data', async () => {
		render(<AddPlayerForm />);

		await fillPlayerName('Juan Perez');
		await fillBirthDate('2000-01-01');
		await clickSubmitButton();

		expect(screen.queryByText(/text-red-600/i)).not.toBeInTheDocument();
	});

	it('shows error messages for empty fields', async () => {
		useFormState.mockReturnValueOnce([
			{
				...initialFormState,
				fieldErrors: {
					playerName: ['Nombre del jugador es requerido'],
					birthDate: ['Fecha de nacimiento es requerida'],
				},
			},
			jest.fn(),
		]);

		render(<AddPlayerForm />);
		await clickSubmitButton();

		checkIfErrorsAreDisplayed();
	});

	const fillPlayerName = async (name) => {
		const playerNameInput = screen.getByPlaceholderText(/Nombre del jugador/i);
		await userEvent.clear(playerNameInput);
		await userEvent.type(playerNameInput, name);
	};

	const fillBirthDate = async (date) => {
		const birthDateInput = screen.getByPlaceholderText(/Fecha de nacimiento/i);
		await userEvent.clear(birthDateInput);
		await userEvent.type(birthDateInput, date);
	};

	const clickSubmitButton = async () => {
		const submitButton = screen.getByRole('button', { name: /Crear jugador/i });
		await userEvent.click(submitButton);
	};

	const checkIfErrorsAreDisplayed = () => {
		expect(
			screen.getByText(/Nombre del jugador es requerido/i)
		).toBeInTheDocument();
		expect(
			screen.getByText(/Fecha de nacimiento es requerida/i)
		).toBeInTheDocument();
	};
});
