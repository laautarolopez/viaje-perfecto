'use server'
import { del } from '@vercel/blob'
import { QueryResultRow, sql } from '@vercel/postgres'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Note } from '../lib/types'

export async function deleteFile(filePath: string) {
  await del(filePath)
  revalidatePath(filePath)
  redirect('vuelos')
}
