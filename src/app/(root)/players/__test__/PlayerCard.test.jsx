import PlayerCard from '../components/PlayerCard';
import { render, screen } from '@testing-library/react';

const mockPlayer = {
	playerName: 'Player 1',
	alias: 'P1',
	totalCrowns: 23,
};

describe('PlayerCard', () => {
	it('renders correctly', async () => {
		render(<PlayerCard {...mockPlayer} />);

		const title = screen.getByRole('heading', { level: 3 });
		expect(title).toHaveTextContent(mockPlayer.playerName);
	});
});
