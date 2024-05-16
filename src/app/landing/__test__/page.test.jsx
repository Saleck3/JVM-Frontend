import { useSession } from 'next-auth/react';
import Landing from '../../page';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react');

describe('landing page', () => {
	it('renders correctly', () => {
		useSession.mockReturnValue({ data: null });

		render(<Landing />);

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent(/Unite a las aventuras/);
	});
});
