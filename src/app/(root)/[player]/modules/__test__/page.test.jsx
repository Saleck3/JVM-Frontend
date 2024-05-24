import { render, screen } from '@testing-library/react';
import Modules from '../page';
import { getServerSession } from 'next-auth';
import { getModules } from '../../../../shared/services/modules.service';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));
jest.mock('../../../../shared/services/modules.service.ts', () => ({
	getModules: jest.fn(),
}));

const mockModules = [
	{
		description: 'Test module',
		recommended: true,
		id: 1,
		playerNick: 'player1',
		progress: 0,
	},
	{
		description: 'Test module 2',
		recommended: false,
		id: 2,
		playerNick: 'player1',
		progress: 0,
	},
];

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
	getModules.mockResolvedValue(mockModules);
});

describe('Modules Page', () => {
	it('should render correctly correctly', async () => {
		render(await Modules({ params: { player: 'foo' } }));
		checkPageTitle();
	});

	it('renders the correct number of modules', async () => {
		render(await Modules({ params: { player: 'foo' } }));
		checkModulesCount(mockModules.length);
	});
});

const checkPageTitle = () => {
	const title = screen.getByRole('heading', { level: 1 });
	expect(title).toHaveTextContent(/Selección de Módulo/);
};

const checkModulesCount = (expectedCount) => {
	const modules = screen.getAllByRole('heading', { level: 3 });
	expect(modules).toHaveLength(expectedCount);
};
