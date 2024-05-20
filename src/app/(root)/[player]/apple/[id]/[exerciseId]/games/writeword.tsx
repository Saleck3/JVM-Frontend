"use client";

import React, { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ResultMessage from "./components/ResultMessage";
import Image from "next/image";
import { Button } from '@/components/ui/button';

type wordParams = {
    correctWord: string;
    image: string;
    params: any;
}

export default function WriteWord({
    correctWord, image, params
}: wordParams) {
    console.log("Palabra correcta " + correctWord);
    const initialInputValue = Array(correctWord.length).fill('');
    const [inputValue, setInputValue] = useState(initialInputValue);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // Inicialmente deshabilitado

    const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {

        const newValue = [...inputValue];
        newValue[index] = e.target.value;
        setInputValue(newValue);
        if (index + 1 < correctWord.length && e.target.value != "") {
            document.getElementById("input_" + (index + 1)).focus();
        }
    };

    const handleSubmit = () => {
        const enteredWord = inputValue.join('').toUpperCase();
        if (enteredWord === correctWord.toUpperCase()) {
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
                        <Image
                            src={image}
                            alt="Imagen a completar"
                            width={500}
                            height={500}
                        />
                        <form onSubmit={handleSubmit} className="mb-4">
                            <div className="flex mb-4 justify-center">
                                {inputValue.map((letter, index) => (
                                    <input
                                        type="text"
                                        value={letter}
                                        onChange={(e) => handleChange(index, e)}
                                        data-testid={`word-input-${index}`}
                                        placeholder="_"
                                        maxLength={1}
                                        className="w-10 h-10 text-center mr-2"
                                        key={index}
                                        id={"input_" + index}
                                    />
                                ))}
                            </div>
                            <Button onClick={handleSubmit} disabled={!isWordComplete || isButtonDisabled}>Verificar</Button>

                        </form>
                        {isCorrect !== null && (
                            <ResultMessage
                                isCorrect={isCorrect}
                                onReset={handleReset}
                                params={params}
                            />
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}