import FetchingScore from '../FetchingScore';
import { render, screen } from '@testing-library/react';

describe('FetchingScore Page', () => {
	it('renders correctly', () => {
		render(<FetchingScore />);
		checkFetchingScoreMessage();
	});
});

const checkFetchingScoreMessage = () => {
	const title = screen.getByText(/Calculando puntaje/i);
	expect(title).toBeInTheDocument();
};
