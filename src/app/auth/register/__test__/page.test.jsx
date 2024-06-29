import Register from '../page';
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

describe('Register Page', () => {
	it('renders correctly', () => {
		render(<Register />);
		checkRegisterImage();
	});
});

const checkRegisterImage = () => {
	const image = screen.getByAltText('lombriz');
	expect(image).toBeInTheDocument();
};
