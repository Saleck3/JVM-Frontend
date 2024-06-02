import { NextRequest, NextResponse} from 'next/server';
import { FormDataSchema } from '@/lib/schema';

export async function addEntry(state: any, data: FormData) {
 console.log(state);
 console.log(data);

  const result = FormDataSchema.safeParse({
    first_name: data.get('name'),
    last_name: data.get('lastname'),
    email: data.get('email'),
    password: data.get('password'),
    repeatPassword: data.get('repeatPassword'),
    terms: data.get('terms'),
  });
  console.log(result);
  if (result.success) {
    try {
      console.log(1);
      console.log(`http://localhost:8080/api/auth/signup`)
      const response = await fetch(`${process.env.API_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName:result.data.first_name,
          email: result.data.email,
          password: result.data.password,
          lastName: result.data.last_name,

        })
        
      });

      if (!response.ok) {
        console.log(2);
        const errorData = await response.json();
        if (errorData.message === 'Email already exists') {
          throw new Error('El correo electrónico ya existe');
        } else {
          throw new Error('Error en la solicitud');
        }
      }

      console.log(3);
      const responseData = await response.json();
      console.log("respuesta: " + responseData);

      // Redirigir al login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      } else {
        return NextResponse.redirect('/login');
      }

    } catch (errorBack: any) {
      console.error("errorBack: ", errorBack);
      console.error("Detailed error:", errorBack);
      return { errorBack:errorBack.message};
    }
  }

  if (result.error) {
    return { error: result.error.format() };
  }
}