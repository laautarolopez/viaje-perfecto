'use server'
import io from 'socket.io-client'

export const sendNotification = (event: string, data: any) => {
    const socket = io('http://localhost:3000')
    socket.emit(event, data);
}