import Feature from '../Feature';
import featureslist from '../featuresList';
import { render, screen } from '@testing-library/react';

const featureToRender = featureslist[0];

describe('Feature', () => {
	it('renders the feature with the correct data from props', () => {
		render(<Feature {...featureToRender} />);

		const title = screen.getByRole('heading', { level: 2 });
		const description = screen.getByText(featureToRender.description);
		const image = screen.getByAltText(featureToRender.imageAlt);

		expect(title).toBeInTheDocument();
		expect(description).toBeInTheDocument();
		expect(image).toBeInTheDocument();
	});

	it('renders in flex reverse row when reverseRow property is true', () => {
		const { container } = render(
			<Feature {...featureToRender} reverseRow={true} />
		);

		const wrapper = container.firstChild;
		const classNames = wrapper.classList;

		expect(classNames).toContain('lg:flex-row-reverse');
	});

	it('renders in flex row when reverseRow property is false', () => {
		const { container } = render(
			<Feature {...featureToRender} reverseRow={false} />
		);

		const wrapper = container.firstChild;
		const classNames = wrapper.classList;

		expect(classNames).toContain('lg:flex-row');
	});
});
