"use server";

import { z } from "zod";
import { destroySession, generateSession } from "@/app/lib/session";
import { redirect } from "next/navigation";

const testUser = {
  id: '1',
  email: "test@example.com",
  password: "testpassword",
};

const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .trim(),
});

export async function login(prevState: any, formData: FormData) {
  const validatedData = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!validatedData.success) {
    return {
        errors: validatedData.error.flatten().fieldErrors
    }
  }

  const {email, password} = validatedData.data;
  if(email != testUser.email || password != testUser.password) {
    return {
        errors: {
            email: ["Invalid email or password"],
        }
    }
  }


  await generateSession(testUser.id);
  redirect('/dashboard')
}

export async function logout() {
  await destroySession()
  redirect('/login')
}
