import React from 'react';
import { Button } from "@/components/ui/button";

interface ResultMessageProps {
    isCorrect: boolean | null;
    onReset: () => void;
}

function ResultMessage({ isCorrect, onReset }: ResultMessageProps) {
    return (
        <div className="mt-4">
            <p className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? '¡Correcto!' : 'Incorrecto. Inténtalo de nuevo.'}
            </p>
            <Button onClick={onReset} className="mt-2">Reiniciar</Button>
        </div>
    );
}

export default ResultMessage;