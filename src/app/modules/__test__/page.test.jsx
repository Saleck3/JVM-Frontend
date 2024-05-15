import Modules from '../page';
import modulesList from '../modulesList';
import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';

jest.mock('next-auth/react');

beforeAll(() => {
	useSession.mockReturnValue({ data: null });
});

describe('modules page', () => {
	it('renders correctly', () => {
		render(<Modules />);

		const title = screen.getByRole('heading', { level: 1 });
		expect(title).toHaveTextContent(/Selección de Módulo/);
	});

	it('renders the correct number of modules', () => {
		render(<Modules />);

		const modules = screen.getAllByRole('heading', { level: 3 });
		expect(modules).toHaveLength(modulesList.length);
	});
});
