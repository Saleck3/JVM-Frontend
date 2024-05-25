'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
//import { api } from '@/library/api';
import { parseError, setFieldErrors } from '@/lib/errors';
import { useSearchParams } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(1, 'Escribí tu nombre'),
    lastname: z.string().min(1, 'Escribí tu apellido'),
    email: z.string().email().min(4, 'No olvides tu email'),
    password: z.string().min(8, 'La clave debe contener al menos 8 carácteres'),
});

type FormData = z.infer<typeof formSchema>;
//const error = useSearchParams().get('error');

export const RegisterForm = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            lastname: '',
            email: '',
            password: '',
        },
    });
    const { name, lastname, email, password } = form.watch();
    const [errorMessage, setErrorMessage] = useState<string>();
    const router = useRouter();

    useEffect(() => {
        setErrorMessage(undefined);
    }, [name, email, password]);

   /** const onSubmit = async (data: FormData) => {
        try {
            await api.post('/register', data);
            router.push('/login');
        } catch (error) {
            const { message, fields } = parseError(error);
            if (fields) {
                setFieldErrors(fields, form.setError);
            } else {
                setErrorMessage(message || 'Something went wrong signing up');
            }
        }
    }; */

    return (
        <Form {...form}>
            <form>
                <div className="space-y-6">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribí tu nombre" autoComplete="register-name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Apellido</FormLabel>
                                <FormControl>
                                    <Input placeholder="Escribí tu apellido" autoComplete="register-lastname" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email@domain.com" autoComplete="register-email" {...field} />
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
                                <FormLabel>Clave</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Escribí tu contraseña"
                                        type="password"
                                        autoComplete="register-password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    
                </div>
                {errorMessage && <p className="text-sm font-semibold text-red-600">{errorMessage}</p>}
                <Button type="submit" className="w-full mt-12 hover:bg-gray-500">
                    Registrarse
                </Button>
            </form>
        </Form>
    );
};