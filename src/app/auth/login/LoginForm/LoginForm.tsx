"use client";

import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

import { LoginSchema } from "@/app/auth/schemas/login.schema";

const LoginForm = () => {

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
        console.log("Formulario enviado correctamente:", data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <div className="space-y-2">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input placeholder="mail@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ingresá tu contraseña"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rememberMe"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        id="rememberMe"
                                    />
                                </FormControl>
                                <FormLabel htmlFor="rememberMe" className="ml-2">Recordarme</FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button className="w-full mt-6" type="submit">
                    Iniciar sesión
                </Button>
            </form>
            <p className="text-center text-md text-gray-600 mt-5">
                ¿No tenés una cuenta?
                <Link className="text-pink-600 hover:underline ml-1" href={"/auth/signup"}>
                    Registrate
                </Link>
            </p>
        </Form>
    );
};

export default LoginForm;
