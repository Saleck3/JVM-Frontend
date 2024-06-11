import { FormDataSchema } from "../../shared/schemas/register.schema";

export async function registerUser(state: any, data: FormData) {
  const result = FormDataSchema.safeParse({
    first_name: data.get("name"),
    last_name: data.get("lastname"),
    email: data.get("email"),
    player_name: data.get("player"),
    password: data.get("password"),
    repeatPassword: data.get("repeatPassword"),
    terms: data.get("terms"),
    recommendedModule: data.get("recommendedModule"),
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
            recommendedModule: result.data.recommendedModule,
          }),
        }
      );

      console.log("Register service response", response);
      if (response.status === 200) {
        window.location.href = "/auth/login?success=registered";
        return;
      }

      if (response.status === 409) {
        return {
          error: {
            general: { _errors: [] },
            first_name: { _errors: [] },
            last_name: { _errors: [] },
            player_name: { _errors: [] },
            password: { _errors: [] },
            repeatPassword: { _errors: [] },
            terms: { _errors: [] },
            email: { _errors: ["El correo electrónico ya existe"] },
          },
        };
      }
      return {
        error: {
          general: { _errors: ["Error en la solicitud"] },
          first_name: { _errors: [] },
          last_name: { _errors: [] },
          player_name: { _errors: [] },
          password: { _errors: [] },
          repeatPassword: { _errors: [] },
          terms: { _errors: [] },
          email: { _errors: [] },
        },
      };
    } catch (errorBack: any) {
      console.error("Detailed error:", errorBack);
      return { errorBack: errorBack.message };
    }
  }
}
