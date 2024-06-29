import { render, screen, fireEvent } from '@testing-library/react';
import WordWritingGame from '../WordWritingGame/WordWritingGame';
import userEvent from '@testing-library/user-event';

describe('WordWritingGame', () => {
	const mockOnCorrectAnswer = jest.fn();
	const mockOnWrongAnswer = jest.fn();
	const mockHandleNextButton = jest.fn();

	window.speechSynthesis = {
		speak: jest.fn(),
		cancel: jest.fn(),
	};

	const defaultProps = {
		correctAnswer: 'apple',
		image: '/path/to/image',
		preSelectedLetters: [],
		onCorrectAnswer: mockOnCorrectAnswer,
		onWrongAnswer: mockOnWrongAnswer,
		handleNextButton: mockHandleNextButton,
		outOfRetries: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the image and correct amount of inputs', () => {
		render(<WordWritingGame {...defaultProps} />);

		checkIfImageIsRendered();
		checkIfInputsAmountAreCorrect();
	});

	it('calls onCorrectAnswer when the correct word is submitted', async () => {
		render(<WordWritingGame {...defaultProps} />);

		inputCorrectAnswer();

		checkAnswer();

		expect(mockOnCorrectAnswer).toHaveBeenCalledTimes(1);
		expect(mockOnWrongAnswer).not.toHaveBeenCalled();
	});

	it('calls onWrongAnswer when an incorrect word is submitted', async () => {
		render(<WordWritingGame {...defaultProps} />);

		inputIncorrectAnswer();

		checkAnswer();

		expect(mockOnWrongAnswer).toHaveBeenCalledTimes(1);
		expect(mockOnCorrectAnswer).not.toHaveBeenCalled();
	});

	it('navigates between inputs with keyboard events', async () => {
		render(<WordWritingGame {...defaultProps} />);

		const inputs = screen.getAllByRole('textbox');

		await userEvent.type(inputs[0], 'a');
		expect(inputs[1]).toHaveFocus();

		await userEvent.type(inputs[1], '{backspace}');
		expect(inputs[0]).toHaveFocus();
	});

	const checkIfImageIsRendered = () => {
		expect(screen.getByAltText('apple')).toBeInTheDocument();
	};

	const checkIfInputsAmountAreCorrect = () => {
		expect(screen.getAllByRole('textbox').length).toBe(
			defaultProps.correctAnswer.length
		);
	};

	const inputCorrectAnswer = () => {
		const inputs = screen.getAllByRole('textbox');
		const correctAnswerArray = defaultProps.correctAnswer.split('');

		correctAnswerArray.forEach((letter, index) => {
			fireEvent.change(inputs[index], { target: { value: letter } });
		});
	};

	const inputIncorrectAnswer = () => {
		const inputs = screen.getAllByRole('textbox');
		const incorrectAnswerArray = 'appla'.split('');

		incorrectAnswerArray.forEach((letter, index) => {
			fireEvent.change(inputs[index], { target: { value: letter } });
		});
	};

	const checkAnswer = () => {
		fireEvent.submit(screen.getByTestId('form'));
	};
});
