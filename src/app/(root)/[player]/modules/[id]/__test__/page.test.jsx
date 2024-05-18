import ApplePath from '../page';
import { render, screen } from '@testing-library/react';
import { getServerSession } from 'next-auth';
import { getApples } from '../services/apples.service';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));
jest.mock('../services/apples.service', () => ({
	getApples: jest.fn(),
}));

const mockApples = [{ id: 1, name: 'apple1' }];

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
	getApples.mockResolvedValue(mockApples);
});

describe('Applepath page', () => {
	it('renders correctly', async () => {
		render(await ApplePath({ params: { player: 'foo' } }));

		expect(ApplePath).toBeDefined();
	});
});
