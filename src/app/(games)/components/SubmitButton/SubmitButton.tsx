import React from 'react';
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
    onClick: () => void;
    disabled: boolean;
}

function SubmitButton({ onClick, disabled }: SubmitButtonProps) {
    return (
        <Button onClick={onClick} disabled={disabled}>
            Verificar
        </Button>
    );
}

export default SubmitButton;