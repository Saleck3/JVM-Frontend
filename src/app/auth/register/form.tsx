"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  name: z.string().min(1, "Escribí tu nombre"),
  lastname: z.string().min(1, "Escribí tu apellido"),
  email: z.string().email().min(4, "No olvides tu email"),
  password: z.string().min(8, "La clave debe contener al menos 8 carácteres"),
  repeatPassword: z.string(), 
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
    },
  });


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
                  <Input
                    placeholder="Escribí tu nombre"
                    autoComplete="register-name"
                    {...field}
                  />
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
                  <Input
                    placeholder="Escribí tu apellido"
                    autoComplete="register-lastname"
                    {...field}
                  />
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
                  <Input
                    placeholder="email@domain.com"
                    autoComplete="register-email"
                    {...field}
                  />
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

          <FormField
            control={form.control}
            name="repeatPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clave</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Repetí tu contraseña"
                    type="password"
                    autoComplete="register-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            //control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Checkbox
                    type="checkbox"
                    onChange={field.onChange}
                    id="terms"
                  />
                </FormControl>
                <FormLabel htmlFor="terms" className="ml-2">
                  Estoy de acuerdo con los términos y las políticas de
                  privacidad
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
       
        <Button type="submit" className="w-full mt-12 hover:bg-gray-500">
          Registrarse
        </Button>
      </form>
    </Form>
  );
};
