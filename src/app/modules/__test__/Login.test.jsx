import LoginForm from '../../auth/login/LoginForm/LoginForm';
import { render, screen,fireEvent } from '@testing-library/react';

beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

describe('LoginForm', () => {
	it('renders login inputs in form', () => {
		render(<LoginForm  />);
        const email = screen.getByText("E-mail");
        const password = screen.getByText("Contraseña");
        const rememberMe = screen.getByText("Recordarme");
		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(rememberMe).toBeInTheDocument();
	});
});
