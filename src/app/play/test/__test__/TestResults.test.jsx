import TestResults from '../components/TestResults';
import { render, screen } from '@testing-library/react';

describe('Test Results Page', () => {
	it('renders correctly', () => {
		render(<TestResults recommendedModule="test module" />);
		checkRecommendedModule();
	});
});

const checkRecommendedModule = () => {
	const heading = screen.getByText(/test module/i);
	expect(heading).toBeInTheDocument();
};
