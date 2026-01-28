"use server"
import { redirect } from "next/navigation";
import { env } from '@/env'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { User as UserDB } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { getUser } from "@/app/actions/users";



export async function createClientServer() {
  const cookieStore = cookies()
  console.log("🚀 ~ createClientServer ~ cookieStore:", cookieStore)

  return createServerClient(
    env.SUPABASE_URL!,
    env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.log(error);

          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
            console.log(error);

          }
        },
      },
    }
  )


}

export type UserServerResponse = {
  user: User;
  userDb: UserDB | null;
} | null;

const getUserServer = async (): Promise<UserServerResponse> => {
  const supabase = await createClientServer()
  const {
    data: { user }, error
  } = await supabase.auth.getUser()

  console.log("🚀 ~ getUserServer ~ user:", user)
  console.log("🚀 ~ getUserServer ~ error:", error)

  if (!user) {
    return null
  }

  const resUserDb = await getUser(user?.id)


  return { user: user, userDb: resUserDb.data ?? null }
}

export default getUserServer