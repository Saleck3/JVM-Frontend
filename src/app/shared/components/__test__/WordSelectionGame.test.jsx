import { render, screen, fireEvent } from '@testing-library/react';
import WordSelectionGame from '../WordSelectionGame';

const mockOnCorrectAnswer = jest.fn();
const mockOnWrongAnswer = jest.fn();
const mockHandleNextButton = jest.fn();

const defaultProps = {
	options: ['Option 1', 'Option 2', 'Option 3'],
	correctAnswer: 'Option 2',
	image: '/img/test-image.jpg',
	label: 'Select the correct option',
	onWrongAnswer: mockOnWrongAnswer,
	onCorrectAnswer: mockOnCorrectAnswer,
	handleNextButton: mockHandleNextButton,
	outOfRetries: false,
};

window.speechSynthesis = {
	speak: jest.fn(),
	cancel: jest.fn(),
};

describe('WordSelectionGame', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render the image if provided', () => {
		render(<WordSelectionGame {...defaultProps} />);

		checkIfImageIsRendered();
	});

	it('should render the play button if no image is provided', () => {
		render(<WordSelectionGame {...defaultProps} image={undefined} />);
		checkIfPlayButtonIsRendered();
	});

	it('should display the label text', () => {
		render(<WordSelectionGame {...defaultProps} />);
		checkIfLabelTextIsRendered();
	});

	it('should call onCorrectAnswer and finish the game when the correct option is selected', () => {
		render(<WordSelectionGame {...defaultProps} />);

		clickCorrectOption();

		expect(mockOnCorrectAnswer).toHaveBeenCalled();
		checkIfOptionsAreDisabled();
	});

	it('should call onWrongAnswer and update options when an incorrect option is selected', () => {
		render(<WordSelectionGame {...defaultProps} />);

		clickIncorrectOption();
		expect(mockOnWrongAnswer).toHaveBeenCalled();

		checkIfClickedOptionIsDisabled();
		checkIfNotClickedOptionIsEnabled();
	});

	const checkIfImageIsRendered = () => {
		expect(screen.getByAltText('Option 2')).toBeInTheDocument();
	};

	const checkIfPlayButtonIsRendered = () => {
		expect(screen.getByTestId('play-button')).toBeInTheDocument();
	};

	const checkIfLabelTextIsRendered = () => {
		expect(screen.getByText('Select the correct option')).toBeInTheDocument();
	};

	const clickCorrectOption = () => {
		const correctButton = screen.getByRole('button', { name: 'Option 2' });
		fireEvent.click(correctButton);
	};

	const checkIfOptionsAreDisabled = () => {
		expect(screen.getByRole('button', { name: 'Option 2' })).toBeDisabled();
	};

	const clickIncorrectOption = () => {
		const incorrectButton = screen.getByRole('button', { name: 'Option 1' });
		fireEvent.click(incorrectButton);
	};

	const checkIfClickedOptionIsDisabled = () => {
		expect(screen.getByRole('button', { name: 'Option 1' })).toBeDisabled();
	};

	const checkIfNotClickedOptionIsEnabled = () => {
		expect(screen.getByRole('button', { name: 'Option 3' })).toBeEnabled();
	};
});
