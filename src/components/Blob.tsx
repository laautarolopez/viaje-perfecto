import { put, list } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import FileBlob from './FileBlob';
 
const Blob = async ({ trip_id, fly_id }: { trip_id: string, fly_id: string }) => {
  async function uploadFile(formData: FormData) {
    'use server';
    const file = formData.get('file') as File;
    const filePath = `${trip_id}/${fly_id}/${file.name}`;
    const blob = await put(filePath, file, {
      access: 'public',
      addRandomSuffix: false
    });
    revalidatePath(`${trip_id}/vuelos`)
    redirect('vuelos')
    return blob;
  }

  async function allFiles() {
    const folder = `${trip_id}/${fly_id}`
    const blobs = await list({prefix: folder})
    return blobs;
  }

  const files = await allFiles()
  const folder = `${trip_id}/${fly_id}`

  return (
    <>
      <form action={uploadFile} className="mb-10">
        <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2"></label>
        <input type="file" id="file" name="file" className="shadow appearance-none border border-green-300 rounded w-full py-2 px-3 mb-2" required />
        <div className="ps-5 pe-5">
            <button type="submit" className="mt-3 w-full rounded-md border border-transparent shadow-sm px-2 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                Subir
            </button>
        </div>
      </form>
      {/* <hr className="relative border-green-300 mt-10" /> */}
      {files && files.blobs.sort((fileA, fileB) => fileA.uploadedAt.getTime() - fileB.uploadedAt.getTime())
          .map((file) => (
          <FileBlob 
            filename={file.pathname.slice(folder.length+1)} 
            download={file.downloadUrl}
          />
      ))}
    </>
  );
}

export default Blob