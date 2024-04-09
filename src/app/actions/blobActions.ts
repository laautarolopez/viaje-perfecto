'use server'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteFile(filePath: string) {
  await del(filePath)
  revalidatePath(filePath)
  redirect('vuelos')
}
