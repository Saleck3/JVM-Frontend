import Signup from '../../auth/signup/SignupForm/SignupForm';
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

describe('Signup', () => {
	it('renders register inputs in form', () => {
		render(<Signup  />);
    const name = screen.getByText("Nombre");
    const lastName = screen.getByText("Apellido");
    const phone = screen.getByText("Número de Teléfono");
    const email = screen.getByText("E-mail");
    const password = screen.getByText("Contraseña");
    const confirmPassword = screen.getByText("Confirmar Contraseña");
    const rules = screen.getByText("Estoy de acuerdo con los términos y las políticas de privacidad");
    const register = screen.getByText("Registrate");
    const login = screen.getByText("Login");

    expect(name).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(rules).toBeInTheDocument();
    expect(register).toBeInTheDocument();
    expect(login).toBeInTheDocument();
	});
});
