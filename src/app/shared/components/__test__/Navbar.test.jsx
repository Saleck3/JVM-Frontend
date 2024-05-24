import { useSession } from 'next-auth/react';
import Navbar from '../Navbar';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react');

describe('Navbar', () => {
	it('renders correctly', () => {
		useSession.mockReturnValue({ data: null });

		render(<Navbar />);

		const logo = screen.getByAltText(/logo/i);
		expect(logo).toBeInTheDocument();
	});
});
