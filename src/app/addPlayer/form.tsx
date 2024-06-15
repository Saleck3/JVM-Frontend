"use client";
import useUserData from '@/app/shared/hooks/useUserData';
import { useFormState, useFormStatus } from "react-dom";
import { addEntry } from "../shared/services/addPlayer.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Form() {
  const { token } = useUserData();
  const [state, formAction] = useFormState(addEntry,null);

  return (
    <section className="flex gap-6">
      <form action={formAction}>
      <input type="hidden" name="token" value={token} />
        {state?.error?.general?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1">
            {state.error.general._errors[0]}
          </p>
        )}
       
        <Label> Nombre del jugador </Label>
        {state?.error?.player_name?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1 mb-1">
            {state.error.player_name._errors[0]}
          </p>
        )}
        <Input name="player" placeholder="Nombre del jugador" />

        <Label> Fecha de nacimiento </Label>
        {state?.error?.birth_date?._errors[0] && (
          <p className="text-sm font-semibold text-red-600 text-xs mt-1 mb-1">
            {state.error.birth_date._errors[0]}
          </p>
        )}
        <Input type="date" name="birthdate" placeholder="Fecha de nacimiento" />

        <SubmitButton></SubmitButton>
      </form>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full mt-10 link" disabled={pending}>
      {pending ? "Agregando..." : "Agregar jugador"}
    </Button>
  );
}
