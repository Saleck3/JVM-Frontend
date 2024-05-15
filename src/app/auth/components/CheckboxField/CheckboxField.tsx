import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

type CheckboxFieldProps = {
    id: string;
    label: string;
    register: any;
    error?: any;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ id, label, register, error }) => {
    return (
        <div className="space-y-2 col-span-2">
            <Checkbox id={id} {...register} /> {label}
            {error && <p>{error.message}</p>}
        </div>
    );
};

export default CheckboxField;