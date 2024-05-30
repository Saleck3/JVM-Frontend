"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { parseError, setFieldErrors } from '@/lib/errors';
import { register } from "./register.service";

const formSchema = z
  .object({
    name: z.string().min(2, "Escribí tu nombre"),
    lastname: z.string().min(2, "Escribí tu apellido"),
    email: z
      .string()
      .email("Formato de email incorrecto")
      .min(4, "No olvides tu email"),
    password: z.string().min(8, "La clave debe contener al menos 8 caracteres"),
    repeatPassword: z
      .string()
      .min(8, "La clave debe contener al menos 8 caracteres"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Las contraseñas deben coincidir",
    path: ["repeatPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export const RegisterForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      repeatPassword: "",
      terms: false,
    },
  });

  const { name, lastname, email, password } = form.watch();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    setErrorMessage(undefined);
  }, [name, email, password]);

  const onSubmit = async (data: FormData) => {
    try {
      register(name,
        lastname,
        email,
        password);
    } catch (error: any) {
      const { message, fields } = parseError(error);
      if (fields) {
        setFieldErrors(fields, form.setError);
      } else {
        setErrorMessage(message || 'Something went wrong signing up');
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribí tu nombre"
                    autoComplete="register-name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
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
                  <Input
                    placeholder="Escribí tu apellido"
                    autoComplete="register-lastname"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
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
                  <Input
                    placeholder="email@domain.com"
                    autoComplete="register-email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
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
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repetí tu Clave</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repetí tu contraseña"
                    type="password"
                    autoComplete="register-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    {...field}
                    checked={field.value}
                    onChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <FormLabel htmlFor="terms" className="ml-2">
                  <span className="ml-3">Estoy de acuerdo con los términos y las políticas de
                    privacidad </span>
                </FormLabel>
                <FormMessage className="text-red-600" />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full mt-10 link">
          Registrarse
        </Button>
      </form>
      {errorMessage && (
        <p className="text-sm font-semibold text-red-600 text-xs mt-1">{errorMessage}</p>
      )}
    </Form>
  );
};
