import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type InputFieldProps = {
    id: string;
    label: string;
    placeholder: string;
    type?: string;
    register: any;
    error?: any;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, type = "text", register, error }) => {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} placeholder={placeholder} {...register} type={type} />
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default InputField;