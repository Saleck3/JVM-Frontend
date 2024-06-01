'use server'

import { FormDataSchema } from '@/lib/schema';

export async function addEntry(state: any, data: FormData) {
  const result = FormDataSchema.safeParse({
    first_name: data.get('name'),
    last_name: data.get('lastname'),
    email: data.get('email'),
    password: data.get('password'),
    repeatPassword: data.get('repeatPassword'),
    terms: data.get('terms'),
  })

  await new Promise(resolve => setTimeout(resolve, 1000))

  if (result.success) {
    console.log(data)
    return { data: result.data } 
    // post al back
  }

  if (result.error) {
    return { error: result.error.format() 
    }
  }
}

