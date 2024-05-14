"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import Link from "next/link";

type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    terms: boolean;
};

export default function Component() {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        console.log(data);
    }

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Registrate</h1>
                    <p className="text-gray-500 dark:text-gray-400">Ingresá tu información para crear tu cuenta</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" placeholder="John" {...register("firstName", { required: true })} />
                        {errors.firstName && <p>Este campo es requerido.</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido</Label>
                        <Input id="lastName" placeholder="Doe" {...register("lastName", { required: true })} />
                        {errors.lastName && <p>Este campo es requerido.</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" placeholder="m@example.com" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                        {errors.email && <p>Ingrese un email válido.</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="phone">Número de teléfono</Label>
                        <Input id="phone" placeholder="12345678" {...register("phone", { required: true, pattern: /^[0-9]{8,10}$/ })} />
                        {errors.phone && <p>Ingrese un número de teléfono válido (entre 8 y 10 dígitos).</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" placeholder="**********" {...register("password", { required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]{8,}$/ })} type="password" />
                        {errors.password && <p>La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra y un número.</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input id="confirmPassword" placeholder="**********" {...register("confirmPassword", { required: true, validate: value => value === getValues().password })} type="password" />
                        {errors.confirmPassword?.type === 'validate' && <p>Las contraseñas no coinciden.</p>}
                        {errors.confirmPassword?.type !== 'validate' && errors.confirmPassword && <p>Este campo es requerido.</p>}
                    </div>
                    <div className="space-y-2 col-span-2">
                        <Checkbox id="terms" {...register("terms", { required: true })} /> Estoy de acuerdo con los términos y las políticas de privacidad
                        {errors.terms && <p>Debe aceptar los términos y las políticas de privacidad.</p>}
                    </div>
                </div>
                <div className="col-span-2">
                    <Button className="w-full" type="submit">
                        Registrate
                    </Button>
                </div>
                <div className="text-center">
                    <div className="space-y-2">¿Ya tienes una cuenta? <Link className="font-bold" href="../../login">Login</Link></div>
                </div>
            </form>
        </div>
    )
}
