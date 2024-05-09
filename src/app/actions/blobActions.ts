'use server'

import { list, del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'

const revalidate = (folder: string) => {
  const folders = folder.split('/');
  const trip_id = folders[0]
  const categoria = folders[1]

  revalidatePath(`${trip_id}/${categoria}`)
}

export async function allFiles(folder: string) {
  const blobs = await list({ prefix: folder })
  return blobs.blobs
}

export async function deleteFile(filePath: string, folder: string) {
  await del(filePath)

  revalidate(folder)
}

export async function upload(form: FormData) {
  const file = form.get('file-to-upload') as File
  const folder = form.get('folder') as string

  const filePath = `${folder}/${file.name}`
  await put(filePath, file, {
    access: 'public',
    addRandomSuffix: false
  })

  revalidate(folder)
}
