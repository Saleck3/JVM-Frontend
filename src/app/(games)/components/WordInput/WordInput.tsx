import React, { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";

interface WordInputProps {
    letter: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    index: number; // Definir el índice como una prop
}

function WordInput({ letter, onChange, index }: WordInputProps) {
    return (
        <Input
            type="text"
            value={letter}
            onChange={onChange} // Usar la función onChange proporcionada
            data-testid={`word-input-${index}`}
            placeholder="_"
            maxLength={1}
            className="w-10 h-10 text-center mr-2"
        />
    );
}

export default WordInput;
