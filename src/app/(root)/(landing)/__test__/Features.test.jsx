import Features from '../components/Features';
import featureslist from '../data/featuresList';
import { render, screen } from '@testing-library/react';

describe('Features', () => {
	it('renders all features', () => {
		render(<Features />);

		const features = screen.getAllByRole('heading', { level: 2 });
		expect(features).toHaveLength(featureslist.length);
	});
});
