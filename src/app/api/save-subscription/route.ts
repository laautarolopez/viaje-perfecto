import { createSubscriptions } from '../../actions/subscriptions'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const user_id = cookies().get('user_id')?.value as string
    const endpoint = request.headers.get('endpoint')!!
    const p256dh = request.headers.get('p256dh')!!
    const auth = request.headers.get('auth')!!

    try {
        await createSubscriptions(user_id, endpoint, p256dh, auth)
        return NextResponse.json("OK")
    } catch (error) {
        console.log('Error al guardar la subscripcion: ', error)
        throw new Error('Error al guardar la subscripcion')
    }
}