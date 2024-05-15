"use client";

import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import InputField from "@/app/auth/components/InputField/InputField";
import CheckboxField from "@/app/auth/components/CheckboxField/CheckboxField";
import { Button } from "@/components/ui/button";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

const RegistrationForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Registrate</h1>
                    <p className="text-gray-500 dark:text-gray-400">Ingresá tu información para crear tu cuenta</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <InputField id="firstName" label="Nombre" placeholder="John" register={register("firstName", { required: true })} error={errors.firstName} />
                    <InputField id="lastName" label="Apellido" placeholder="Doe" register={register("lastName", { required: true })} error={errors.lastName} />
                    <InputField id="email" label="Email" placeholder="m@example.com" register={register("email", { required: true, pattern: /^\S+@\S+$/i })} error={errors.email} />
                    <InputField id="phone" label="Número de teléfono" placeholder="12345678" register={register("phone", { required: true, pattern: /^[0-9]{8,10}$/ })} error={errors.phone} />
                    <InputField id="password" label="Contraseña" placeholder="**********" type="password" register={register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/ })} error={errors.password} />
                    <InputField id="confirmPassword" label="Confirmar contraseña" placeholder="**********" type="password" register={register("confirmPassword", { required: true, validate: value => value === getValues().password })} error={errors.confirmPassword} />
                    <CheckboxField id="terms" label="Estoy de acuerdo con los términos y las políticas de privacidad" register={register("terms", { required: true })} error={errors.terms} />
                </div>
                <div className="col-span-2">
                    <Button className="w-full" type="submit">
                        Registrate
                    </Button>
                </div>
                <div className="text-center">
                    <div className="space-y-2">¿Ya tienes una cuenta? <Link className="font-bold" href={"./login"}>Login</Link></div>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;