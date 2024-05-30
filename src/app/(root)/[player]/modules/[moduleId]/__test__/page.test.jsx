import { render, screen } from '@testing-library/react';
import ApplePath from '../page';
import { getServerSession } from 'next-auth';
import { getApples } from '../../../../../shared/services/apples.service';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));
jest.mock('../../../../../shared/services/apples.service');

const mockApples = [{ id: 1, name: 'apple1' }];

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
	getApples.mockResolvedValue(mockApples);
});

describe('ApplePath Page', () => {
	it('renders correctly', async () => {
		render(await ApplePath({ params: { player: 'foo' } }));
		checkPageRender();
	});
});

const checkPageRender = () => {
	expect(ApplePath).toBeDefined();
};
