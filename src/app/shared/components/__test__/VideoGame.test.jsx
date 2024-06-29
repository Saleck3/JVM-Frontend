import { render, screen } from '@testing-library/react';
import VideoGame from '../VideoGame';

// Mocks
jest.mock('../GameLayout.tsx', () => ({
	__esModule: true,
	default: (props) => <div {...props} />,
}));

describe('VideoGame', () => {
	const defaultProps = {
		src: 'https://www.example.com/video',
		handleNextButton: jest.fn(),
		onWrongAnswer: jest.fn(),
		onCorrectAnswer: jest.fn(),
		outOfRetries: false,
	};

	it('renders the iframe with the correct src', () => {
		render(<VideoGame {...defaultProps} />);

		checkIfVideoHasCorrectSrc();
	});

	it('renders the iframe with proper attributes', () => {
		render(<VideoGame {...defaultProps} />);

		checkIfVideoHasCorrectAttributes();
	});

	const checkIfVideoHasCorrectSrc = () => {
		const iframe = screen.getByTestId('video');
		expect(iframe).toBeInTheDocument();
		expect(iframe).toHaveAttribute('src', defaultProps.src);
	};

	const checkIfVideoHasCorrectAttributes = () => {
		const iframe = screen.getByTestId('video');
		expect(iframe).toHaveAttribute('allowFullScreen');
		expect(iframe).toHaveClass('w-full h-full rounded-lg');
	};
});
