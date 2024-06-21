
import Landing from '../page';
import { render, screen } from '@testing-library/react';


describe('Landing Page', () => {
	it('renders correctly', () => {
		render(<Landing />);
		checkLandingPageTitle();
	});
});

const checkLandingPageTitle = () => {
	const title = screen.getByRole('heading', { level: 1 });
	expect(title).toHaveTextContent(/Unite a las aventuras/);
};
