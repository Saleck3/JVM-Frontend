import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../login/LoginForm/LoginForm';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

describe('LoginForm', () => {
    console.log = jest.fn();

    test('displays success message on form submission', async () => {
        render(<LoginForm />);

        const emailInput = screen.getByPlaceholderText('mail@example.com');
        const passwordInput = screen.getByPlaceholderText('Ingresá tu contraseña');
        const submitButton = screen.getByText('Iniciar sesión');

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(submitButton);

        await new Promise(resolve => setTimeout(resolve, 100));

        expect(console.log).toHaveBeenCalledWith('Formulario enviado correctamente:', {
            email: 'test@example.com',
            password: 'password123',
            rememberMe: false
        });
    });

    test('renders login inputs in form', () => {
        render(<LoginForm />);
        const email = screen.getByText("E-mail");
        const password = screen.getByText("Contraseña");
        const rememberMe = screen.getByText("Recordarme");
        expect(email).toBeInTheDocument();
        expect(password).toBeInTheDocument();
        expect(rememberMe).toBeInTheDocument();
    });

    test('allows user to input email, password, and check remember me', () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText("mail@example.com");
        const passwordInput = screen.getByPlaceholderText("Ingresá tu contraseña");
        const rememberMeCheckbox = screen.getByLabelText("Recordarme");

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(rememberMeCheckbox);

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
        expect(rememberMeCheckbox).toBeChecked();
    });

    test('shows validation errors for empty email and password', async () => {
        render(<LoginForm />);const submitButton = screen.getByText("Iniciar sesión");

        const emailInput = screen.getByPlaceholderText("mail@example.com");
        const passwordInput = screen.getByPlaceholderText("Ingresá tu contraseña");

        fireEvent.change(emailInput, { target: { value: 'empty e-mail' } });
        fireEvent.change(passwordInput, { target: { value: 'empty password' } });
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/E-mail/i);
        const emptyEmailInput = screen.getByDisplayValue('empty e-mail');
        const emptyPasswordInput = screen.getByDisplayValue('empty password');

        expect(errorMessage).toBeInTheDocument();
        expect(emptyEmailInput).toBeInTheDocument();
        expect(emptyPasswordInput).toBeInTheDocument();
    });

    test('shows an error when invalid email is entered', async () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText("mail@example.com");
        const submitButton = screen.getByText("Iniciar sesión");

        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        fireEvent.click(submitButton);

        const errorMessage = await screen.findByText(/E-mail/i);
        const invalidEmailInput = screen.getByDisplayValue('invalid-email');

        expect(errorMessage).toBeInTheDocument();
        expect(invalidEmailInput).toBeInTheDocument();
    });


});
