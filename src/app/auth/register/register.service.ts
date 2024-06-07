import { NextRequest, NextResponse } from "next/server";
import { FormDataSchema } from "@/lib/schema";

export async function addEntry(state: any, data: FormData) {
  const result = FormDataSchema.safeParse({
    first_name: data.get("name"),
    last_name: data.get("lastname"),
    email: data.get("email"),
    player_name: data.get("player"),
    password: data.get("password"),
    repeatPassword: data.get("repeatPassword"),
    terms: data.get("terms"),
  });

  if (result.error) {
    return { error: result.error.format() };
  }

  if (result.success) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: result.data.first_name,
            email: result.data.email,
            password: result.data.password,
            lastName: result.data.last_name,
            playerName: result.data.player_name,
          }),
        }
      );

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login?success=registered";
      } else {
        NextResponse.redirect(
          new URL(
            `${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login?success=registered`
          )
        );
      }

      if (!response.ok) {
        if (response.status === 409) {
          return {
            error: {
              email: { _errors: ["El correo electrónico ya existe"] },
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
