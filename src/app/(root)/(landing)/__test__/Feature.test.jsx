import { render, screen } from '@testing-library/react';
import Feature from '../components/Feature';
import featureslist from '../data/featuresList';

const featureToRender = featureslist[0];

describe('Feature Component', () => {
	it('should render the feature with the correct data from props', () => {
		render(<Feature {...featureToRender} />);
		checkFeatureContent(featureToRender);
	});

	it('should render in flex reverse row when reverseRow property is true', () => {
		const { container } = render(
			<Feature {...featureToRender} reverseRow={true} />
		);
		checkFlexDirection(container, 'lg:flex-row-reverse');
	});

	it('should render in flex row when reverseRow property is false', () => {
		const { container } = render(
			<Feature {...featureToRender} reverseRow={false} />
		);
		checkFlexDirection(container, 'lg:flex-row');
	});
});

const checkFeatureContent = (feature) => {
	const title = screen.getByRole('heading', { level: 2 });
	const description = screen.getByText(feature.description);
	const image = screen.getByAltText(feature.imageAlt);

	expect(title).toBeInTheDocument();
	expect(description).toBeInTheDocument();
	expect(image).toBeInTheDocument();
};

const checkFlexDirection = (container, expectedClass) => {
	const wrapper = container.firstChild;
	const classNames = wrapper.classList;

	expect(classNames).toContain(expectedClass);
};
