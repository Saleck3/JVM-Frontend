import { render, screen } from '@testing-library/react';
import VoiceRecognitionGameButtons from '../VoiceRecognitionGame/VoiceRecognitionGameButtons';
import userEvent from '@testing-library/user-event';

describe('VoiceRecognitionGameButtons', () => {
	const defaultProps = {
		onPlayClick: jest.fn(),
		onRecordClick: jest.fn(),
		onCheckClick: jest.fn(),
		isRecording: false,
		recordDisabled: false,
		checkDisabled: false,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the buttons correctly', () => {
		render(<VoiceRecognitionGameButtons {...defaultProps} />);

		checkButtonsAreRendered();
	});

	it('calls onPlayClick when the play button is clicked', async () => {
		render(<VoiceRecognitionGameButtons {...defaultProps} />);

		await userEvent.click(screen.getByTestId('play-button'));

		expect(defaultProps.onPlayClick).toHaveBeenCalled();
	});

	it('calls onRecordClick when the record button is clicked', async () => {
		render(<VoiceRecognitionGameButtons {...defaultProps} />);

		await userEvent.click(screen.getByRole('button', { name: 'Grabar' }));

		expect(defaultProps.onRecordClick).toHaveBeenCalled();
	});

	it('calls onCheckClick when the check button is clicked', async () => {
		render(<VoiceRecognitionGameButtons {...defaultProps} />);

		await userEvent.click(screen.getByRole('button', { name: 'Revisar' }));

		expect(defaultProps.onCheckClick).toHaveBeenCalled();
	});

	it('disables the record button when recordDisabled is true', () => {
		render(
			<VoiceRecognitionGameButtons {...defaultProps} recordDisabled={true} />
		);

		expect(screen.getByRole('button', { name: 'Grabar' })).toBeDisabled();
	});

	it('disables the check button when checkDisabled is true', () => {
		render(
			<VoiceRecognitionGameButtons {...defaultProps} checkDisabled={true} />
		);

		expect(screen.getByRole('button', { name: 'Revisar' })).toBeDisabled();
	});

	const checkButtonsAreRendered = () => {
		expect(screen.getByText('Grabar')).toBeInTheDocument();
		expect(screen.getByText('Revisar')).toBeInTheDocument();
	};
});
