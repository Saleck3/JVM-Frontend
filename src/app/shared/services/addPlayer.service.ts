import { NextResponse } from "next/server";
import { FormAddPlayerSchema } from "../schemas/addPlayer.schema";
import useUserData from '@/app/shared/hooks/useUserData';

export async function addEntry( state: any, data: FormData) {

  const result = FormAddPlayerSchema.safeParse({
    player_name: data.get("player"),
    birth_date: data.get("birthdate"),
  });
  if (result.error) {
    return { error: result.error.format() };
  }

  if (result.success) {
    try {
      const token = data.get('token') as string;
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/addPlayer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            playerName: result.data.player_name,
            birthDate: result.data.birth_date,
          }),
        }
      );
      if (typeof window !== "undefined") {
        window.location.href = "/players";
      } else {
        NextResponse.redirect(
          new URL(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/players`
          )
        );
      }
      if (!response.ok) {
        if (response.status === 400) {
          return {
            error: {
              email: { _errors: [""] },
            },
          };
        } else {
          return {
            error: {
              general: { _errors: ["Error en la solicitud"] },
            },
          };
        }
      }
    } catch (errorBack: any) {
      console.error("Detailed error:", errorBack);
      return { errorBack: errorBack.message };
    }
  }
}
