"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
    email: string;
    password: string;
    rememberMe: boolean;
};

export default function Component() {
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
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="m@example.com" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    {errors.email && <p>Ingrese un email válido.</p>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" placeholder="**********" {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/ })} type="password" />
                    {errors.password && <p>La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.</p>}
                </div>
                <div className="space-y-2">
                    <Checkbox id="rememberMe" {...register("rememberMe")} />
                    <Label htmlFor="rememberMe">Recordarme</Label>

                </div>
                <div className="text-center">
                    <Button className="w-full" type="submit">
                        Login
                    </Button>
                </div>
                <div className="text-center">
                    <div className="space-y-2">¿No tenés cuenta? <Link className="font-bold" href="../../register">Registrate</Link></div>
                </div>
            </form>
        </div>
    )
}
