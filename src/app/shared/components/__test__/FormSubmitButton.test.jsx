import { render, screen } from '@testing-library/react';
import { useFormStatus } from 'react-dom';
import FormSubmitButton from '../FormSubmitButton';

jest.mock('react-dom', () => ({
	...jest.requireActual('react-dom'),
	useFormStatus: jest.fn(),
}));

describe('FormSubmitButton', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the button with children when pending is false', () => {
		useFormStatus.mockReturnValue({ pending: false });

		render(<FormSubmitButton>Submit</FormSubmitButton>);

		checkIfButtonIsRendered();
	});

	it('renders a spinner and disables the button when pending is true', () => {
		useFormStatus.mockReturnValue({ pending: true });

		render(<FormSubmitButton>Submit</FormSubmitButton>);

		checkIfSpinnerIsRendered();
	});

	const checkIfButtonIsRendered = () => {
		const button = screen.getByRole('button');
		expect(button).toBeInTheDocument();
		expect(button).toHaveTextContent('Submit');
		expect(button).not.toBeDisabled();
	};

	const checkIfSpinnerIsRendered = () => {
		const button = screen.getByTestId('spinner');
		expect(button).toBeInTheDocument();
	};
});
