import Navbar from '../Navbar/Navbar';
import { getServerSession } from 'next-auth';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { cookies, mockCookies } from '../../mockData/cookiesMock';

jest.mock('next-auth/react');
jest.mock('next-auth', () => ({
	getServerSession: jest.fn(),
}));
jest.mock('next/navigation', () => ({
	useRouter: jest.fn(),
}));

cookies.mockReturnValue({
	get: jest.fn().mockReturnValue({
		value: JSON.stringify(mockCookies)
	})
});

beforeAll(() => {
	getServerSession.mockReturnValue({
		user: {
			players: [{ recommendedModule: 1, alias: 'foo' }],
		},
	});
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

describe('Navbar Component', () => {
	it('renders correctly', () => {
		render(Navbar());
		checkNavbarRender();
	});
});

const checkNavbarRender = () => {
	const logo = screen.getByAltText(/logo/i);
	expect(logo).toBeInTheDocument();
};
