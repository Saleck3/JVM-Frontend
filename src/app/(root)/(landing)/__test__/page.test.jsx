import { useSession } from 'next-auth/react';
import Landing from '../page';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react');

describe('Landing Page', () => {
	it('renders correctly', () => {
		useSession.mockReturnValue({ data: null });
		render(<Landing />);
		checkLandingPageTitle();
	});
});

const checkLandingPageTitle = () => {
	const title = screen.getByRole('heading', { level: 1 });
	expect(title).toHaveTextContent(/Unite a las aventuras/);
};
