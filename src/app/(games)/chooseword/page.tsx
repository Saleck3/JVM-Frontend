"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WordImage from "../components/WordImage/WordImage";
import SubmitButton from "../components/SubmitButton/SubmitButton";
import ResultMessage from "../components/ResultMessage/ResultMessage";
import WordButton from "../components/WordButton/WordButton";

function ChooseWord() {
    const correctWord = 'leon';
    const options = ['leon', 'tigre', 'pantera', 'jaguar'];
    const [selectedWord, setSelectedWord] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);

    const handleSelectWord = (word: string) => {
        setSelectedWord(word);
        setIsButtonDisabled(false);
    };

    const handleSubmit = () => {
        if (selectedWord === correctWord) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setIsButtonDisabled(true);
    };

    const handleReset = () => {
        setSelectedWord(null);
        setIsCorrect(null);
        setIsButtonDisabled(true);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Selecciona la palabra</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <WordImage />
                        <div className="flex flex-wrap justify-center mt-4">
                            {options.map((word) => (
                                <WordButton
                                    key={word}
                                    word={word}
                                    selectedWord={selectedWord}
                                    onClick={handleSelectWord}
                                />
                            ))}
                        </div>
                        <SubmitButton onClick={handleSubmit} disabled={isButtonDisabled} />
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

export default ChooseWord;
