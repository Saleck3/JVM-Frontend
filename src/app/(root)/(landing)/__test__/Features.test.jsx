import { render, screen } from '@testing-library/react';
import Features from '../components/Features';
import featureslist from '../data/featuresList';

describe('Features Component', () => {
	it('renders all features', () => {
		render(<Features />);
		checkAllFeaturesRendered(featureslist.length);
	});
});

const checkAllFeaturesRendered = (expectedCount) => {
	const features = screen.getAllByRole('heading', { level: 2 });
	expect(features).toHaveLength(expectedCount);
};
