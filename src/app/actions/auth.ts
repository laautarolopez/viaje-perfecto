'use server'
import { query } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signin(email: string, password: string): Promise<void> {
    try {
      const data = await query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password])
      const user = data.rows[0]

      if(!user) throw new Error('Credenciales inválidas.')

      cookies().set('user_id', user.id)
      redirect('/')
    } catch (error) {
        console.log(error)
    }
}

export async function register(email: string, password: string): Promise<void> {
  try {
    const data = await query('SELECT * FROM users WHERE email = $1', [email])
    const user = data.rows[0]
    if(user) throw new Error('El correo ya existe.')

    const newUser = await query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, password])

    cookies().set('user_id', newUser.id)
    redirect('/')
  } catch (error) {
      console.log(error)
  }
}

export async function logout() {
  cookies().delete('user_id')
  redirect('/login')
}