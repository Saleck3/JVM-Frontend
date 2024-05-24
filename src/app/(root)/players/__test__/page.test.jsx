import { useSession } from 'next-auth/react';
import PlayerSelection from '../page';
import { render, screen } from '@testing-library/react';
import { getServerSession } from 'next-auth';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));

const mockSessionData = { data: null };

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
});

describe('Players page', () => {
	it('should render correctly', async () => {
		useSession.mockReturnValue(mockSessionData);

		render(await PlayerSelection());

		checkPlayerSelectionPageRender();
	});
});

const checkPlayerSelectionPageRender = () => {
	const title = screen.getByRole('heading', { level: 1 });
	expect(title).toHaveTextContent(/Selección de jugador/);
};
