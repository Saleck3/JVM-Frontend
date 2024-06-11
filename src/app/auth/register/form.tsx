"use client";

import { useFormState, useFormStatus } from "react-dom";
import { registerUser } from "@/app/shared/services/register.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const [state, formAction] = useFormState(registerUser, null);

  return (
    <section className="flex gap-6">
      <form action={formAction}>
        {state?.error?.general?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.general._errors[0]}
          </p>
        )}
        <Label> Nombre </Label>
        {state?.error?.first_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.first_name._errors[0]}
          </p>
        )}
        <Input name="name" placeholder="Nombre del adulto" />

        <Label> Apellido </Label>
        {state?.error?.last_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.last_name._errors[0]}
          </p>
        )}
        <Input name="lastname" placeholder="Apellido del adulto" />

        <Label> Email </Label>
        {state?.error?.email?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.email._errors[0]}
          </p>
        )}
        <Input name="email" placeholder="email@domain.com" />

        <Label> Nombre del jugador </Label>
        {state?.error?.player_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.player_name._errors[0]}
          </p>
        )}
        <Input name="player" placeholder="Nombre del jugador" />

        <Label> Clave </Label>

        {state?.error?.password?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.password._errors[0]}
          </p>
        )}
        <Input
          name="password"
          placeholder="Escribí tu clave de 8 o más caracteres"
        />

        <Label> Repita su clave </Label>
        {state?.error?.repeatPassword?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.repeatPassword._errors[0]}
          </p>
        )}
        <Input name="repeatPassword" placeholder="Repetí tu clave" />

        <Label>Aceptar términos y condiciones</Label>
        {state?.error?.terms?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.terms._errors}
          </p>
        )}
        <Input type="checkbox" name="terms" />

        <Input
          type="hidden"
          name="recommendedModule"
          value={typeof window !== 'undefined' && localStorage!.getItem("lecti") && JSON.parse(localStorage!.getItem("lecti")!).recommendedModule || ""}
        />

        <OnSubmit />
      </form>
    </section>
  );
}

function OnSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-10 link" disabled={pending}>
      {pending ? "Registrando..." : "Registrarse"}
    </Button>
  );
}
