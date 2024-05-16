import Modules from '../page';
import modulesList from '../modulesList';
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

describe('modules page', () => {
	it('renders correctly', async () => {
		render(await Modules({ params: { player: 'foo' } }));

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent(/Selección de Módulo/);
	});

	it('renders the correct number of modules', async () => {
		render(await Modules({ params: { player: 'foo' } }));

		const modules = screen.getAllByRole('heading', { level: 3 });
		expect(modules).toHaveLength(modulesList.length);
	});
});
