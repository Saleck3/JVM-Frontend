import React, { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";

interface WordInputProps {
    letter: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function WordInput({ letter, onChange }: WordInputProps) {
    return (
        <Input
            type="text"
            value={letter}
            onChange={onChange}
            placeholder="_"
            maxLength={1}
            className="w-10 h-10 text-center mr-2"
        />
    );
}

export default WordInput;