import React from 'react';
import { Button } from "@/components/ui/button";

type WordButtonProps = {
    word: string;
    selectedWord: string | null;
    onClick: (word: string) => void;
}

export default function WordButton({ word, selectedWord, onClick }: WordButtonProps) {
    let extraClass;
    if (selectedWord === word) {
        extraClass = 'bg-pink-600 text-white'
    } else {
        extraClass = 'bg-gray-300 text-gray-700'
    }

    return (
        <Button
            onClick={() => onClick(word)}
            className={`m-2 px-4 py-2 rounded ${extraClass}`}
            disabled={selectedWord !== null}
        >
            {word}
        </Button>
    );
}

