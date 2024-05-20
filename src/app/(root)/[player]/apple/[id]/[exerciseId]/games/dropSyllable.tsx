"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SyllableContainer from "./components/SyllableContainer";
import { Button } from '@/components/ui/button';
import ResultMessage from './components/ResultMessage';

type dropSyllableParams = {
    syllables: string[]
    correctWord: string;
    image: string;
    params: any;
}

export default function DropSyllable({
    syllables, correctWord, image, params
}: dropSyllableParams) {

    const [orderedSyllables, setOrderedSyllables] = useState(syllables);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const updatedSyllables = Array.from(orderedSyllables);
        const [removed] = updatedSyllables.splice(result.source.index, 1);
        updatedSyllables.splice(result.destination.index, 0, removed);

        setOrderedSyllables(updatedSyllables);
    };

    const handleSubmit = () => {
        const enteredWord = orderedSyllables.join('');
        if (enteredWord === correctWord) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setIsButtonDisabled(true);
    };

    const handleReset = () => {
        setOrderedSyllables(syllables);
        setIsCorrect(null);
        setIsButtonDisabled(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-sm space-y-6 text-center">
                <Card>
                    <CardHeader>
                        <CardTitle>Ordena las sílabas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Image
                            src={image}
                            alt="Imagen a completar"
                            width={500}
                            height={500}
                        />
                        <div className="flex justify-center">

                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId="droppable" direction="horizontal">
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex">
                                            <SyllableContainer syllables={orderedSyllables} />
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>

                        <Button onClick={handleSubmit} disabled={isButtonDisabled} >Verificar</Button>
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