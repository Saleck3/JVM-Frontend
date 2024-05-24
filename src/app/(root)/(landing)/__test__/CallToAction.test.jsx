import CallToAction from '../components/CallToAction';
import { render, screen } from '@testing-library/react';

describe('CallToAction', () => {
	it('renders correctly', () => {
		render(<CallToAction />);

		const heading = screen.getByRole('heading', { level: 2 });
		expect(heading).toBeInTheDocument();
		expect(heading).toHaveTextContent(/¡Comenzá ya tu aventura!/);
	});
});
