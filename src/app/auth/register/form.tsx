"use client";

import { useFormState, useFormStatus } from "react-dom";
import { addEntry } from "./register.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [state, formAction] = useFormState(addEntry, null);

  return (
    <section className="flex gap-6">
      <form action={formAction}>
      {state?.errorBack && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.errorBack}
          </p>
        )}
        <Label> Nombre </Label>
        {state?.error?.first_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.first_name._errors[0]}
          </p>
        )}
        <Input name="name" placeholder="Escribí tu nombre" />

        <Label> Apellido </Label>
        {state?.error?.last_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.last_name._errors[0]}
          </p>
        )}
        <Input name="lastname" placeholder="Escribí tu apellido" />

        {state?.error?.email?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.email._errors[0]}
          </p>
        )}
        <Label> Email </Label>
        <Input name="email" placeholder="email@domain.com" />

        {state?.error?.password?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.password._errors[0]}
          </p>
        )}
        <Label> Clave </Label>
        <Input
          name="password"
          placeholder="Escribí tu clave de 8 o más caracteres"
        />

        {state?.error?.repeatPassword?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.repeatPassword._errors[0]}
          </p>
        )}
        <Label> Repita su clave </Label>
        <Input name="repeatPassword" placeholder="Repetí tu clave"/>

        <Label>Aceptar términos y condiciones</Label>
        {state?.error?.terms?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.terms._errors}
          </p>
        )}
        <Input type="checkbox" name="terms" />
       
        <SubmitButton></SubmitButton>
        
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-10 link" disabled={pending}>
      {pending ? "Registrando..." : "Registrarse"}
    </Button>
    
  );
}
