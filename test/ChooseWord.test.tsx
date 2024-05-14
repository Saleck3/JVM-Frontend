import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChooseWord from '../src/app/(games)/chooseword/page';
import { describe } from 'node:test';

describe('ChooseWord component', () => {
    test('renders component correctly', () => {
        render(<ChooseWord />);
        expect(screen.getByText('Selecciona la palabra')).toBeInTheDocument();
    });

    test('selects word correctly', () => {
        render(<ChooseWord />);
        const wordButtons = screen.getAllByRole('button');
        fireEvent.click(wordButtons[0]);
        expect(wordButtons[0]).toHaveClass('selected');
    });

    test('submits answer correctly', () => {
        render(<ChooseWord />);
        const wordButtons = screen.getAllByRole('button');
        fireEvent.click(wordButtons[0]);
        fireEvent.click(screen.getByText('Verificar'));
        expect(screen.getByTestId('result-message')).toBeInTheDocument();
    });
});