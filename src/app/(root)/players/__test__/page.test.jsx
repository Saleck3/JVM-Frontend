import { useSession } from 'next-auth/react';
import PlayerSelection from '../page';
import { render, screen } from '@testing-library/react';
import { getServerSession } from 'next-auth';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
});

describe('players page', () => {
	it('renders correctly', async () => {
		useSession.mockReturnValue({ data: null });

		render(await PlayerSelection());

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent(/Selección de jugador/);
	});
});
