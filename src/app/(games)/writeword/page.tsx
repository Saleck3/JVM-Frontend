"use client";

import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordInput from "../components/WordInput/WordInput";
import WordImage from "../components/WordImage/WordImage";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import ResultMessage from "../components/ResultMessage/ResultMessage";
import Lecti from '../components/Lecti/Lecti';

function WriteWord() {
    const correctWord = 'leon';
    const initialInputValue = Array(correctWord.length).fill('');
    const [inputValue, setInputValue] = useState(initialInputValue);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // Inicialmente deshabilitado

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const newValue = [...inputValue];
        newValue[index] = e.target.value;
        setInputValue(newValue);
    };

    const handleSubmit = () => {
        const enteredWord = inputValue.join('').toLowerCase();
        if (enteredWord === correctWord) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setIsButtonDisabled(true);
    };

    const handleReset = () => {
        setInputValue(initialInputValue);
        setIsCorrect(null);
        setIsButtonDisabled(false);
    };

    const isWordComplete = inputValue.every(letter => letter !== '');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Escribe la palabra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordImage/>
                        <form onSubmit={handleSubmit} className="mb-4">
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
                            <SubmitButton onClick={handleSubmit} disabled={!isWordComplete || isButtonDisabled} />

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
            <div className="ml-auto w-40 h-40">
                <Lecti/>
            </div>
        </div>
    );
}

export default WriteWord;
