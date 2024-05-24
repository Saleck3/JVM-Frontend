import { useSession } from 'next-auth/react';
import Navbar from '../Navbar';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react');

describe('Navbar Component', () => {
	it('should render correctly', () => {
		useSession.mockReturnValue({ data: null });

		render(<Navbar />);
		checkNavbarRender();
	});
});

const checkNavbarRender = () => {
	const logo = screen.getByAltText(/logo/i);
	expect(logo).toBeInTheDocument();
};
