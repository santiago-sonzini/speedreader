'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod';

import { getUser } from './users';
import { db } from '@/server/db';
import { createClientServer } from '@/lib/user';





export async function login(values: any) {
  const supabase = await createClientServer()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { data, error } = await supabase.auth.signInWithPassword({
    email: values.email,
    password: values.password,
  })
  console.log("🚀 ~ login ~ data:", data)



  if (error ) {
    return {status: 401, message: error.message}
    //redirect('/error')
  }

  if (data) {
    const res = await getUser(data.user.id)
    if (res.status === 200) {
      console.log("🚀 ~ login ~ res:", res.data)
      redirect("/")
    
    } else {
      return {status: 401, message: "Error al recuperar usuario"}
    }
  }

  redirect('/')

  return {status: 200, message: "Logged in successfully"}

}

export async function signup(values: any) {
  const supabase = await createClientServer()
  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
    options:{
      data: {
        name: values.email.split('@')[0]
      }
    }
  })

  if (error) {
    console.log("🚀 ~ signup ~ error:", error)
    return {status: 401, message: error.message}
    //redirect('/error')
  }

  if (data && data.user) {
    const res = await getUser(data.user.id)
    if (res.status === 200) {
      redirect("/products")
    } else {
      return {status: 401, message: "Error al recuperar usuario"}
    }
  }
  redirect('/')
  return {status: 200, message: "Logged in successfully"}


}


export async function signOut() {
  const supabase = await createClientServer()
  const { error } = await supabase.auth.signOut()
  if (!error) {
    revalidatePath('/auth/signin')
    redirect('/auth/signin')
  }
}