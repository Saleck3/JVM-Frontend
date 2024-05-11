import RootLayout from '../../layout';
import { render, screen } from '@testing-library/react';

describe('root layout', () => {
	it('renders UI', () => {
		const lorem = 'Lorem ipsum dolor sit amet';
		const mockChildren = <p>{lorem}</p>;

		render(<RootLayout>{mockChildren}</RootLayout>);

		const p = screen.getByText(lorem);
		expect(p).toBeInTheDocument();
	});
});
