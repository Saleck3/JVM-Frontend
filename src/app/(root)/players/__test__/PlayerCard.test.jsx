import PlayerCard from '../components/PlayerCard';
import { render, screen } from '@testing-library/react';

const mockPlayer = {
	playerName: 'Player 1',
	alias: 'P1',
	totalCrowns: 23,
};

describe('PlayerCard Component', () => {
	it('should render correctly', async () => {
		render(<PlayerCard {...mockPlayer} />);

		checkPlayerCardRender(mockPlayer);
	});
});

const checkPlayerCardRender = (player) => {
	const title = screen.getByRole('heading', { level: 3 });
	expect(title).toHaveTextContent(player.playerName);
};
