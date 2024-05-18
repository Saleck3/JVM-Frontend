import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignupForm from '../signup/SignupForm/SignupForm';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
}))

console.log = jest.fn();

test('displays success message on form submission', async () => {
    render(<SignupForm />);

    const firstNameInput = screen.getByPlaceholderText('Nombre');
    const lastNameInput = screen.getByPlaceholderText('Apellido');
    const phoneNumberInput = screen.getByPlaceholderText('12345678');
    const emailInput = screen.getByPlaceholderText('mail@example.com');
    const passwordInput = screen.getByPlaceholderText('Ingresa tu contraseña');
    const confirmPasswordInput = screen.getByPlaceholderText('Reingresa tu contraseña');
    const termsCheckbox = screen.getByLabelText('Estoy de acuerdo con los términos y las políticas de privacidad');
    const submitButton = screen.getByText('Registrate');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneNumberInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);
    fireEvent.click(submitButton);

    await new Promise(resolve => setTimeout(resolve, 200));

    expect(console.log).toHaveBeenCalledWith('Formulario enviado correctamente:', {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '12345678',
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
        terms: true,
    });
});

test('renders signup inputs in form', () => {
    render(<SignupForm />);
    const firstName = screen.getByPlaceholderText("Nombre");
    const lastName = screen.getByPlaceholderText("Apellido");
    const phoneNumber = screen.getByPlaceholderText("12345678");
    const email = screen.getByPlaceholderText("mail@example.com");
    const password = screen.getByPlaceholderText("Ingresa tu contraseña");
    const confirmPassword = screen.getByPlaceholderText("Reingresa tu contraseña");
    const termsCheckbox = screen.getByLabelText("Estoy de acuerdo con los términos y las políticas de privacidad");
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(phoneNumber).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(confirmPassword).toBeInTheDocument();
    expect(termsCheckbox).toBeInTheDocument();
});

test('allows user to input signup data', () => {
    render(<SignupForm />);
    const firstNameInput = screen.getByPlaceholderText("Nombre");
    const lastNameInput = screen.getByPlaceholderText("Apellido");
    const phoneNumberInput = screen.getByPlaceholderText("12345678");
    const emailInput = screen.getByPlaceholderText("mail@example.com");
    const passwordInput = screen.getByPlaceholderText("Ingresa tu contraseña");
    const confirmPasswordInput = screen.getByPlaceholderText("Reingresa tu contraseña");
    const termsCheckbox = screen.getByLabelText("Estoy de acuerdo con los términos y las políticas de privacidad");

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneNumberInput, { target: { value: '12345678' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
    fireEvent.click(termsCheckbox);

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(phoneNumberInput.value).toBe('12345678');
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(confirmPasswordInput.value).toBe('password123');
    expect(termsCheckbox).toBeChecked();
});

test('shows validation errors for empty fields', async () => {
    render(<SignupForm />);
    const submitButton = screen.getByText("Registrate");

    fireEvent.click(submitButton);

    // Wait for error messages to appear
    const errorMessageFirstName = await screen.findByText(/Nombre/i);
    const errorMessageLastName = await screen.findByText(/Apellido/i);
    const errorMessagePhoneNumber = await screen.findByText(/Número de Teléfono/i);
    const errorMessageEmail = await screen.findByText(/E-mail/i);
    const errorMessagePassword = await screen.findByText(/Contraseña/i, { exact: true });
    const errorMessageConfirmPassword = await screen.findByText(/Confirmar password/i);
    const errorMessageTerms = await screen.findByText(/Estoy de acuerdo con los términos y las políticas de privacidad/i);

    expect(errorMessageFirstName).toBeInTheDocument();
    expect(errorMessageLastName).toBeInTheDocument();
    expect(errorMessagePhoneNumber).toBeInTheDocument();
    expect(errorMessageEmail).toBeInTheDocument();
    expect(errorMessagePassword).toBeInTheDocument();
    expect(errorMessageConfirmPassword).toBeInTheDocument();
    expect(errorMessageTerms).toBeInTheDocument();
});
