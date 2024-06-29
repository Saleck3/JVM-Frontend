import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameCheckButton from '../GameCheckButton';

describe('GameCheckButton', () => {
	const mockOnClick = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders correctly with outOfRetries state', () => {
		render(
			<GameCheckButton
				onClick={mockOnClick}
				outOfRetries={true}
				gameFinished={false}
				wrongAttempt={false}
				loading={false}
			/>
		);

		checkIfTryLaterButtonIsRendered();
	});

	it('renders correctly with gameFinished state', () => {
		render(
			<GameCheckButton
				onClick={mockOnClick}
				outOfRetries={false}
				gameFinished={true}
				wrongAttempt={false}
				loading={false}
			/>
		);

		checkIfNextButtonIsRendered();
	});

	it('renders correctly with loading state', () => {
		render(
			<GameCheckButton
				onClick={mockOnClick}
				outOfRetries={false}
				gameFinished={false}
				wrongAttempt={false}
				loading={true}
			/>
		);

		checkIfInLoadingState();
	});

	it('renders correctly with wrongAttempt state', () => {
		render(
			<GameCheckButton
				onClick={mockOnClick}
				outOfRetries={false}
				gameFinished={false}
				wrongAttempt={true}
				loading={false}
			/>
		);

		checkIfRetryButtonIsRendered();
	});

	const checkIfTryLaterButtonIsRendered = () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText('¡Hagamoslo luego!')).toBeInTheDocument();
	};

	const checkIfNextButtonIsRendered = () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText('Siguiente')).toBeInTheDocument();
	};

	const checkIfInLoadingState = () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.queryByText('Siguiente')).not.toBeInTheDocument();
	};

	const checkIfRetryButtonIsRendered = () => {
		expect(screen.getByRole('button')).toBeInTheDocument();
		expect(screen.getByText('Reintentar')).toBeInTheDocument();
	};
});
