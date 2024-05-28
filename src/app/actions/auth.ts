'use server'
import { query } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function signin(
  email: string,
  password: string
): Promise<{ message: string }> {
  try {
    const data = await query(
      'SELECT * FROM users WHERE email = $1 AND password = $2',
      [email, password]
    )
    const user = data.rows[0]

    if (!user)
      return {
        message: 'Correo o contraseña incorrectos.'
      }

    cookies().set('user_id', user.id)
  } catch (error) {
    console.log('🚀 ~ error:', error)
    return {
      message: 'Hubo un error registrando el usuario, intente mas tarde.'
    }
  }
  revalidatePath('/')
  redirect('/')
}

export async function register(
  email: string,
  password: string
): Promise<{ message: string }> {
  try {
    const data = await query('SELECT * FROM users WHERE email = $1', [email])
    const user = data.rows[0]
    if (user)
      return {
        message: 'El correo ya está registrado.'
      }

    const newUserResponse = await query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
      [email, password]
    )

    cookies().set('user_id', newUserResponse.rows[0].id)
  } catch (error) {
    console.log(error)
    return {
      message: 'Hubo un error registrando el usuario, intente mas tarde.'
    }
  }
  revalidatePath('/')
  redirect('/')
}

export async function profile() {
  const user_id = cookies().get('user_id')?.value

  try {
    const data = await query('SELECT * FROM users WHERE id = $1', [user_id])

    if(!data.rows[0]) return { message: 'El usuario no existe' }

    return data.rows[0]
  } catch (error) {
    console.log('🚀 ~ error:', error)
    return {
      message: 'Hubo un error obteniendo el perfil del usuario.'
    }
  }
}

export async function logout() {
  cookies().delete('user_id')
  redirect('/login')
}
