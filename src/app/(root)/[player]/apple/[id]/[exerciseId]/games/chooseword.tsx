"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import ResultMessage from "./components/ResultMessage";
import WordButton from "./components/WordButton";
import Image from "next/image";

type chooseWordParams = {
    words: string[]
    correctWord: string;
    image: string;
    params: any;
}

export default function ChooseWord({
    words, correctWord, image, params
}: chooseWordParams) {
    console.log("Palabra correcta " + correctWord);
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
                        <Image
                            src={image}
                            alt={"Imagen de " + correctWord.toLowerCase()}
                            width={500}
                            height={500}
                        />
                        <div className="flex flex-wrap justify-center mt-4">
                            {words.map((word) => (
                                <WordButton
                                    key={word}
                                    word={word}
                                    selectedWord={selectedWord}
                                    onClick={handleSelectWord}
                                />
                            ))}
                        </div>
                        <Button onClick={handleSubmit} disabled={isButtonDisabled} >Enviar</Button>
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


