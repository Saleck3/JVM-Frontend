import Hero from '../Hero';
import { render, screen } from '@testing-library/react';

describe('Hero', () => {
	it('renders correctly', () => {
		render(<Hero />);

		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent('Unite a las aventuras');
	});
});
