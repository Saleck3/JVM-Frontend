import { render, screen } from '@testing-library/react';
import GameRenderer from '../GameRenderer';

jest.mock('../WordOrderingGame/WordOrderingGame.tsx', () => ({
	__esModule: true,
	default: jest.fn(() => <div>WordOrderingGame Component</div>),
}));

jest.mock('../WordSelectionGame.tsx', () => ({
	__esModule: true,
	default: jest.fn(() => <div>WordSelectionGame Component</div>),
}));

jest.mock('../WordWritingGame/WordWritingGame', () => ({
	__esModule: true,
	default: jest.fn(() => <div>WordWritingGame Component</div>),
}));

jest.mock('../VoiceRecognitionGame/VoiceRecognitionGame', () => ({
	__esModule: true,
	default: jest.fn(() => <div>VoiceRecognitionGame Component</div>),
}));

jest.mock('../VideoGame', () => ({
	__esModule: true,
	default: jest.fn(() => <div>VideoGame Component</div>),
}));

describe('GameRenderer', () => {
	const defaultProps = {
		gameData: {
			params: {
				options: [],
				correctAnswer: '',
				image: '',
				preSelectedLetters: [],
				label: '',
				src: '',
			},
			gameType: 'letter_ordering',
			id: '1',
		},
		outOfRetries: false,
		handleNextButton: jest.fn(),
		handleCorrectAnswer: jest.fn(),
		handleWrongAnswer: jest.fn(),
	};

	it('renders WordOrderingGame for letter_ordering type', () => {
		render(<GameRenderer {...defaultProps} />);
		expect(screen.getByText('WordOrderingGame Component')).toBeInTheDocument();
	});

	it('renders WordSelectionGame for image_selection type', () => {
		render(
			<GameRenderer
				{...defaultProps}
				gameData={{ ...defaultProps.gameData, gameType: 'image_selection' }}
			/>
		);
		expect(screen.getByText('WordSelectionGame Component')).toBeInTheDocument();
	});

	it('renders WordWritingGame for image_writing type', () => {
		render(
			<GameRenderer
				{...defaultProps}
				gameData={{ ...defaultProps.gameData, gameType: 'image_writing' }}
			/>
		);
		expect(screen.getByText('WordWritingGame Component')).toBeInTheDocument();
	});

	it('renders VoiceRecognitionGame for audio_repeating type', () => {
		render(
			<GameRenderer
				{...defaultProps}
				gameData={{ ...defaultProps.gameData, gameType: 'audio_repeating' }}
			/>
		);
		expect(
			screen.getByText('VoiceRecognitionGame Component')
		).toBeInTheDocument();
	});

	it('renders VideoGame for video type', () => {
		render(
			<GameRenderer
				{...defaultProps}
				gameData={{ ...defaultProps.gameData, gameType: 'video' }}
			/>
		);
		expect(screen.getByText('VideoGame Component')).toBeInTheDocument();
	});
});
