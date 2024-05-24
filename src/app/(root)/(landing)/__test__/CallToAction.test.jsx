import { render, screen } from '@testing-library/react';
import CallToAction from '../components/CallToAction';

describe('CallToAction Component', () => {
	it('should render the Call to Action', () => {
		render(<CallToAction />);
		checkCallToActionHeading();
	});
});

const checkCallToActionHeading = () => {
	const heading = screen.getByRole('heading', { level: 2 });
	expect(heading).toBeInTheDocument();
	expect(heading).toHaveTextContent(/¡Comenzá ya tu aventura!/);
};
