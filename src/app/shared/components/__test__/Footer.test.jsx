import Footer from '../Footer';
import { render, screen } from '@testing-library/react';

describe('Footer', () => {
	it('renders correctly', () => {
		render(<Footer />);

		const copyright = screen.getByText(
			'© 2024 Lecti. Todos los derechos reservados.'
		);
		expect(copyright).toBeInTheDocument();
	});
});
