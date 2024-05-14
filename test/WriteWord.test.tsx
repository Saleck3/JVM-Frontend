import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import WriteWord from '../src/app/(games)/writeword/page';

describe('WriteWord component', () => {
    it('renders correctly', () => {
        const { getByText } = render(<WriteWord />);
        expect(getByText('Escribe la palabra')).toBeInTheDocument();
    });

    it('handles input change correctly', async () => {
        const { getByTestId } = render(<WriteWord />);
        const input = getByTestId('word-input-0') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'l' } });
        expect(input.value).toBe('l');
    });

    it('submits the form correctly', async () => {
        const { getByTestId, getByText } = render(<WriteWord />);
        const input = getByTestId('word-input-0') as HTMLInputElement;
        fireEvent.change(input, { target: { value: 'l' } });
        fireEvent.change(getByTestId('word-input-1') as HTMLInputElement, { target: { value: 'e' } });
        fireEvent.change(getByTestId('word-input-2') as HTMLInputElement, { target: { value: 'o' } });
        fireEvent.change(getByTestId('word-input-3') as HTMLInputElement, { target: { value: 'n' } });
        fireEvent.submit(getByText('Verificar'));
        await waitFor(() => {
            expect(getByText('¡Correcto!')).toBeInTheDocument();
        });
    });
});