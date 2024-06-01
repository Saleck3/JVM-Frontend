import Navbar from '../Navbar';
import { getServerSession } from 'next-auth';
import { render, screen } from '@testing-library/react';

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

describe('Navbar Component', () => {
	it('renders correctly', async () => {
		render(await Navbar());
		checkNavbarRender();
	});
});

const checkNavbarRender = () => {
	const logo = screen.getByAltText(/logo/i);
	expect(logo).toBeInTheDocument();
};
