import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import BlobForm from './BlobForm';
 
const Blob = async ({ trip_id, fly_id }: { trip_id: string, fly_id: string }) => {
  async function uploadFile(formData: FormData) {
    'use server';
    const file = formData.get('file') as File;
    const filePath = `${trip_id}/${fly_id}/${file.name}`;
    const blob = await put(filePath, file, {
      access: 'public',
    });
    revalidatePath('/');
    console.log(blob)
    return blob;
  }
 
  return (
    <BlobForm action={uploadFile} />
  );
}

export default Blob