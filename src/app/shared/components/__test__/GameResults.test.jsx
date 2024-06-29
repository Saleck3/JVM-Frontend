import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamesResults from '../GamesResults';

describe('GamesResults', () => {
	const defaultProps = {
		score: 3,
		moduleUrl: '/module',
	};

	it('renders the congratulatory message with the correct score', () => {
		render(<GamesResults {...defaultProps} />);

		expect(screen.getByText('¡Felicitaciones!')).toBeInTheDocument();
		expect(screen.getByText(/3/i)).toBeInTheDocument();
	});

	it('renders the image correctly', () => {
		render(<GamesResults {...defaultProps} />);

		const image = screen.getByAltText('felicitaciones');
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute('src', '/img/party.svg');
	});

	it('renders the back button and handles navigation', () => {
		render(<GamesResults {...defaultProps} />);

		checkIfBackButtonIsRendered();
	});

	function checkIfBackButtonIsRendered() {
		const button = screen.getByRole('button', { name: /Volver al módulo/i });
		expect(button).toBeInTheDocument();
	}
});
