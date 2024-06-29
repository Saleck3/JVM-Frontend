import { render } from '@testing-library/react';
import Apple from '../components/Apple';

describe('Apple component', () => {
	const defaultProps = {
		name: 'Test Apple',
		id: 1,
		stars: 3,
		leftPosition: '50px',
		colors: { front: '#ff0000', back: '#00ff00' },
	};

	it('renders without crashing', () => {
		const { getByText } = render(<Apple {...defaultProps} />);
		expect(getByText('Test Apple')).toBeInTheDocument();
	});

	it('renders with correct left position', () => {
		const { container } = render(<Apple {...defaultProps} />);
		checkCorrectLeftPosition(container, defaultProps.leftPosition);
	});

	it('renders apple icons with correct colors', () => {
		const { container } = render(<Apple {...defaultProps} />);
		checkCorrectColors(
			container,
			defaultProps.colors.front,
			defaultProps.colors.back
		);
	});

	it('renders the correct name', () => {
		const { getByText } = render(<Apple {...defaultProps} />);
		expect(getByText('Test Apple')).toBeInTheDocument();
	});

	it('renders the correct number of stars', () => {
		const { container } = render(<Apple {...defaultProps} />);
		checkStarsCount(container, defaultProps.stars);
	});

	const checkCorrectColors = (container, frontColor, backColor) => {
		const appleIcons = container.querySelectorAll('svg');
		expect(appleIcons[0]).toHaveStyle(`color: ${frontColor}`);
		expect(appleIcons[1]).toHaveStyle(`color: ${backColor}`);
	};

	const checkStarsCount = (container, stars) => {
		const starIcons = container.querySelectorAll(
			'.text-yellow-600, .text-yellow-400'
		);
		expect(starIcons.length).toBe(stars * 2);
	};

	const checkCorrectLeftPosition = (container, leftPosition) => {
		const linkElement = container.querySelector('a');
		expect(linkElement).toHaveStyle(`left: ${leftPosition}`);
	};
});
