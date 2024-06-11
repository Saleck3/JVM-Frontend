'use server;'

import { FormAddPlayerSchema } from "../schemas/schema";
import { getSsrUtils } from '@/lib/utils';

export async function addPlayer(state: any, data: FormData) {
  const result = FormAddPlayerSchema.safeParse({
    player_name: data.get("player"),
    birth_date: data.get("birthdate"),
  });

  if (result.error) {
    return { error: result.error.format() };
  }

  if (result.success) {
    const ssrUtils = await getSsrUtils();
    const token = ssrUtils.getAccessTokenSsr();

    try {
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

      if (response.status === 200) {
        console.log("soy un 200 del ts")
        window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/players`;
        return;
      }

      if (response.status === 400) {
        console.log("soy un 400 del ts")
        return {
          error: {
            player_name: { _errors: [] },
            birth_date: { _errors: [] },
            general: { _errors: [""] },
          },
        };
      } else {
        return {
          error: {
            player_name: { _errors: [] },
            birth_date: { _errors: [] },
            general: { _errors: ["Error en la solicitud"] },
          },
        };
      }
    }
    catch (errorBack: any) {
      console.error("Detailed error:", errorBack);
      return { errorBack: errorBack.message };
    }
  }
}