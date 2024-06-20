import PlayerCard from '../components/PlayerCard';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

beforeAll(() => {
	useRouter.mockReturnValue({
		route: '/',
		pathname: '',
		query: '',
		asPath: '',
		push: jest.fn(),
		replace: jest.fn(),
		reload: jest.fn(),
		back: jest.fn(),
		prefetch: jest.fn().mockResolvedValue(undefined),
		beforePopState: jest.fn(),
		events: {
			on: jest.fn(),
			off: jest.fn(),
			emit: jest.fn(),
		},
	});
});

const mockPlayer = {
	id: "1",
	playerName: 'Player 1',
	alias: 'P1',
	birthDate: "",
	totalCrowns: 23,
	spentCrowns: 2,
	recommendedModule: 1,
};

describe('PlayerCard Component', () => {
	it('should render correctly', async () => {
		render(<PlayerCard {...{ player: mockPlayer }} />);
		checkPlayerCardRender(mockPlayer);
	});
});

const checkPlayerCardRender = (player) => {
	const title = screen.getByRole('heading', { level: 3 });
	expect(title).toHaveTextContent(player.playerName);
};
