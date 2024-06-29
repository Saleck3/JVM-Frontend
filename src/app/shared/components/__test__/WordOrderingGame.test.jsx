import { render, screen, fireEvent } from '@testing-library/react';
import WordOrderingGame from '../WordOrderingGame/WordOrderingGame';
import GameLayout from '../GameLayout';
import WordOrderingGameSortableOptions from '../WordOrderingGame/WordOrderingGameSortableOptions';
import { gameInstructions } from '@/app/play/[appleId]/data/gameInstructions';

jest.mock('../GameLayout', () =>
	jest.fn(({ children }) => <div>{children}</div>)
);
jest.mock('../WordOrderingGame/WordOrderingGameSortableOptions', () =>
	jest.fn(({ onSort }) => (
		<div
			data-testid="sortable-options"
			onClick={() => onSort(['a', 'b', 'c'])}
		></div>
	))
);

describe('WordOrderingGame', () => {
	const props = {
		options: ['a', 'b', 'c'],
		image: '/path/to/image.jpg',
		correctAnswer: 'abc',
		onWrongAnswer: jest.fn(),
		onCorrectAnswer: jest.fn(),
		handleNextButton: jest.fn(),
		outOfRetries: false,
		tts: '',
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the game layout with correct props', () => {
		render(<WordOrderingGame {...props} />);

		checkIfGameLayoutIsRenderedCorrectly();
	});

	it('renders the sortable options with correct props', () => {
		render(<WordOrderingGame {...props} />);

		checkIfSortableOptionsIsRenderedCorrectly();
	});

	const checkIfGameLayoutIsRenderedCorrectly = () => {
		expect(GameLayout).toHaveBeenCalledWith(
			expect.objectContaining({
				gameFinished: false,
				wrongAttempt: false,
				outOfRetries: false,
				handleNextButton: props.handleNextButton,
				title: 'Ordená los elementos',
				gameInstructions: gameInstructions['WordOrderingGame'],
				checkGame: expect.any(Function),
			}),
			{}
		);
	};

	const checkIfSortableOptionsIsRenderedCorrectly = () => {
		expect(WordOrderingGameSortableOptions).toHaveBeenCalledWith(
			expect.objectContaining({
				options: props.options,
				onSort: expect.any(Function),
				disableDrag: false,
			}),
			{}
		);
	};
});
