import Footer from '../Footer';
import { render, screen } from '@testing-library/react';

describe('Footer Component', () => {
	it('should render correctly', () => {
		render(<Footer />);

		checkFooterRender();
	});
});

const checkFooterRender = () => {
	const copyright = screen.getByText(
		'© 2024 Lecti. Todos los derechos reservados.'
	);
	expect(copyright).toBeInTheDocument();
};
