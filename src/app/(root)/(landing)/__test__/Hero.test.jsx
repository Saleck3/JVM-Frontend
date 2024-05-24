import { render, screen } from '@testing-library/react';
import Hero from '../components/Hero';

describe('Hero Component', () => {
	it('should render correctly', () => {
		render(<Hero />);
		checkHeroHeading();
	});
});

const checkHeroHeading = () => {
	const heading = screen.getByRole('heading', { level: 1 });
	expect(heading).toBeInTheDocument();
	expect(heading).toHaveTextContent('Unite a las aventuras');
};
