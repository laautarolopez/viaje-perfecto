'use server'

import { del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteFile(filePath: string) {
  await del(filePath)
  revalidatePath(filePath)
  redirect('vuelos')
}

export async function upload(form: FormData) {
  const file = form.get('file-to-upload') as File
  const trip_id = form.get('trip_id') as string
  const fly_id = form.get('fly_id') as string

  const filePath = `${trip_id}/vuelos/${fly_id}/${file.name}`
  await put(filePath, file, {
    access: 'public',
    addRandomSuffix: false
  })

  revalidatePath(`${trip_id}/vuelos`)
}
