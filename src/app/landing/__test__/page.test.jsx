import Landing from '../../page';
import { render, screen } from '@testing-library/react';

describe('landing page', () => {
	it('renders correctly', () => {
		render(<Landing />);

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent(/Unite a las aventuras/);
	});
});
