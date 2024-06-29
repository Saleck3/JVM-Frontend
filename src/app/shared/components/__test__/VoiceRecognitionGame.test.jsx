import { render, screen } from '@testing-library/react';
import VoiceRecognitionGame from '../VoiceRecognitionGame/VoiceRecognitionGame';

jest.mock('../../services/exercises.service', () => ({
	scoreVoice: jest.fn(),
}));

jest.mock('../../hooks/useTextToSpeech', () => ({
	__esModule: true,
	default: jest.fn(() => [jest.fn()]),
}));

global.navigator.permissions = {
	query: jest.fn().mockResolvedValue({ permissions: { state: 'granted' } }),
};

//eslint-disable-next-line
jest.mock('../GameLayout', () => ({ children }) => <div>{children}</div>);

global.navigator.mediaDevices = {
	getUserMedia: jest.fn().mockResolvedValue({}),
};

describe('VoiceRecognitionGame', () => {
	const defaultProps = {
		gameId: '123',
		playerId: '456',
		correctAnswer: 'Test',
		onWrongAnswer: jest.fn(),
		onCorrectAnswer: jest.fn(),
		handleNextButton: jest.fn(),
		outOfRetries: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render permission request if no audio permissions', async () => {
		global.navigator.permissions.query.mockResolvedValueOnce({
			state: 'denied',
		});

		render(<VoiceRecognitionGame {...defaultProps} />);

		checkIfPermissionsNotGranted();
	});

	const checkIfPermissionsNotGranted = () => {
		expect(screen.getByText('¿Nos das permiso?')).toBeInTheDocument();
		expect(
			screen.getByText(
				'Necesitamos que nos permitas usar el microfono para poder evaluarte :)'
			)
		).toBeInTheDocument();
	};
});
