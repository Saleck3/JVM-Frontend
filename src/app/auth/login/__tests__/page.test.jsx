import Login from '../page';
import { render, screen } from '@testing-library/react';
import { useFormState } from 'react-dom';

jest.mock('react-dom', () => ({
	...jest.requireActual('react-dom'),
	useFormState: jest.fn(),
	useFormStatus: () => ({ pending: false }),
}));

beforeEach(() => {
	useFormState.mockReturnValue([null, jest.fn()]);
});

describe('Login Page', () => {
	it('renders correctly', () => {
		render(<Login />);
		checkLoginHeader();
	});
});

const checkLoginHeader = () => {
	const heading = screen.getByText('Ingresá a tu cuenta');
	expect(heading).toBeInTheDocument();
};
