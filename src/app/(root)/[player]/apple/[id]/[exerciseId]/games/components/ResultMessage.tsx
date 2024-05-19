import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'lucide-react';

interface ResultMessageProps {
    isCorrect: boolean | null;
    onReset: () => void;
    params: any
}

function ResultMessage({ isCorrect, onReset, params }: ResultMessageProps) {
    let numeroEjercicioSiguiente = parseInt(params.exerciseId) + 1;
    if (isCorrect) {
        return (
            <div className="mt-4" data-testid="result-message">
                <p className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>¡Correcto!</p>
                <a href={`/${params.player}/apple/${params.id}/${numeroEjercicioSiguiente}`}>
                    <Button className="mt-2">Siguiente</Button>
                </a>
            </div >
        );
    } else {
        return (
            <div className="mt-4" data-testid="result-message">
                <p className={`text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    Incorrecto. Inténtalo de nuevo.
                </p>
                <Button onClick={onReset} className="mt-2">Reiniciar</Button>
            </div>
        );
    }
}

export default ResultMessage;