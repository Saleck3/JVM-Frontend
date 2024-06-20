import { render, screen } from '@testing-library/react';
import Modules from '../page';
import { getModules } from '@/app/shared/services/modules.service';
import { mockCookies } from '../../../shared/mockData/cookiesMock';
import { getCurrentPlayer } from '@/lib/sessionUtils';

jest.mock('../../../../lib/sessionUtils.ts', () => ({
	getCurrentPlayer: jest.fn(),
}));

jest.mock('next-auth/react');

jest.mock('../../../shared/services/modules.service.ts', () => ({
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
	getModules.mockResolvedValue(mockModules);

	getCurrentPlayer.mockResolvedValue(mockCookies.currentPlayer);
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
