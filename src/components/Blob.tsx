import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import BlobForm from './BlobForm';
 
const Blob = async ({ trip_id, fly_id }: { trip_id: string, fly_id: string }) => {
  async function uploadFile(file: File) {
    'use server';
    const filePath = `${trip_id}/${fly_id}/${file.name}`;
    const blob = await put(filePath, file, {
      access: 'public',
    });
    revalidatePath(`${trip_id}/vuelos`);
    return blob;
  }
 
  return (
    <BlobForm action={uploadFile} />
  );
}

export default Blob