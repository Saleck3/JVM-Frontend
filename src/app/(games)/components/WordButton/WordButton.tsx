import React from 'react';
import { Button } from "@/components/ui/button";

interface WordButtonProps {
    word: string;
    selectedWord: string | null;
    onClick: (word: string) => void;
}

function WordButton({ word, selectedWord, onClick }: WordButtonProps) {
    return (
        <Button
            onClick={() => onClick(word)}
            className={`m-2 px-4 py-2 rounded ${
                selectedWord === word ? 'bg-pink-600 text-white' : 'bg-gray-300 text-gray-700'
            }`}
            disabled={selectedWord !== null}
        >
            {word}
        </Button>
    );
}

export default WordButton;