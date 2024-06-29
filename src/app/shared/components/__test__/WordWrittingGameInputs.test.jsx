import { render, screen, fireEvent } from '@testing-library/react';
import WordWritingGameInputs from '../WordWritingGame/WordWritingGameInputs';
import userEvent from '@testing-library/user-event';

describe('WordWritingGameInputs', () => {
	const mockOnKeyUp = jest.fn();

	const defaultProps = {
		word: 'apple',
		preSelectedLetters: [{ index: 0, letter: 'a' }],
		onKeyUp: mockOnKeyUp,
		disableInputs: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the inputs correctly with preselected letters', () => {
		render(<WordWritingGameInputs {...defaultProps} />);

		const inputs = screen.getAllByRole('textbox');
		checkInputsLength(inputs, defaultProps.word.length);

		expect(inputs[0]).toHaveValue('a');
		expect(inputs[0]).toBeDisabled();

		for (let i = 1; i < inputs.length; i++) {
			expect(inputs[i]).toHaveValue('');
			expect(inputs[i]).not.toBeDisabled();
		}
	});

	it('calls onKeyUp when a key is pressed', async () => {
		render(<WordWritingGameInputs {...defaultProps} />);

		await pressKey();
		expect(mockOnKeyUp).toHaveBeenCalled();
	});

	it('disables inputs when disableInputs is true', () => {
		render(<WordWritingGameInputs {...defaultProps} disableInputs={true} />);

		const inputs = screen.getAllByRole('textbox');
		checkIfIsDisabled(inputs);
	});

	const checkInputsLength = (inputs, length) => {
		expect(inputs.length).toBe(length);
	};

	const pressKey = async () => {
		const inputs = screen.getAllByRole('textbox');
		await userEvent.type(inputs[1], 'p');
	};

	const checkIfIsDisabled = (inputs) => {
		inputs.forEach((input) => {
			expect(input).toBeDisabled();
		});
	};
});
