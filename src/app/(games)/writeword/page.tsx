"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "../components/WordInput/WordInput";
import WordImage from "../components/WordImage/WordImage";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import ResultMessage from "../components/ResultMessage/ResultMessage";

function WriteWord() {
    const correctWord = 'leon';
    const initialInputValue = Array(correctWord.length).fill('');
    const [inputValue, setInputValue] = useState(initialInputValue);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = [...inputValue];
        newValue[index] = e.target.value;
        setInputValue(newValue);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const enteredWord = inputValue.join('').toLowerCase();
        if (enteredWord === correctWord) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleReset = () => {
        setInputValue(initialInputValue);
        setIsCorrect(null);
    };

    const isWordComplete = inputValue.every(letter => letter !== '');

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Escribe la palabra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordImage />
                        <form onSubmit={handleSubmit}>
                            <div className="flex mb-4 justify-center">
                                {inputValue.map((letter, index) => (
                                    <WordInput
                                        key={index}
                                        letter={letter}
                                        onChange={(e) => handleChange(index, e)}
                                        index={index}
                                    />
                                ))}
                            </div>
                            <SubmitButton onClick={() => handleSubmit} disabled={!isWordComplete} />
                        </form>
                        {isCorrect !== null && (
                            <ResultMessage
                                isCorrect={isCorrect}
                                onReset={handleReset}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default WriteWord;
