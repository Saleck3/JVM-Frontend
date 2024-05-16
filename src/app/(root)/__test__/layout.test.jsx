import { useSession } from 'next-auth/react';
import { render, screen } from '@testing-library/react';
import HomeLayout from '../layout';

jest.mock('next-auth/react');

describe('home layout', () => {
	it('renders correctly', () => {
		useSession.mockReturnValue({ data: null });

		render(
			<HomeLayout>
				<h1>Foo</h1>
			</HomeLayout>
		);

		const children = screen.getByText('Foo');
		expect(children).toBeInTheDocument();
	});
});
