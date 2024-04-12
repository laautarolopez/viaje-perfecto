'use server'
import { del } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteFile(filePath: string) {
  await del(filePath)
  revalidatePath(filePath)
  redirect('vuelos')
}

;('use server')
import { del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteFile(filePath: string) {
  await del(filePath)
  revalidatePath(filePath)
  redirect('vuelos')
}

export async function uploadFile(file: File, trip_id: string, fly_id: string) {
  console.log(file, 'file')
  const filePath = `${trip_id}/vuelos/${fly_id}/${file.name}`
  const blob = await put(filePath, file, {
    access: 'public',
    addRandomSuffix: false
  })
  revalidatePath(`${trip_id}/vuelos`)
  redirect('vuelos')
  return blob
}
