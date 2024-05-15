"use client";

import { useForm } from "react-hook-form";
import React from "react";
import InputField from "@/app/auth/components/InputField/InputField";
import CheckboxField from "@/app/auth/components/CheckboxField/CheckboxField";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const LoginForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Login</h1>
                    <p className="text-gray-500 dark:text-gray-400">Ingresá tu información para entrar a tu cuenta</p>
                </div>
                <InputField id="email" label="Email" placeholder="m@example.com" error={errors.email && "Ingrese un email válido."} register={register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <InputField id="password" label="Contraseña" placeholder="**********" error={errors.password && "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número."} register={register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/ })} />
                <CheckboxField id="rememberMe" label="Recordarme" register={register("rememberMe")} />
                <div className="text-center">
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </div>
                <div className="text-center">
                    <div className="space-y-2">¿No tenés cuenta? <Link className="font-bold" href={"./register"}>Registrate</Link></div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;