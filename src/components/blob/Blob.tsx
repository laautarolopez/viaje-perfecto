import BlobForm from './BlobForm'
import { ListBlobResultBlob, list } from '@vercel/blob'
import BlobFiles from './BlobFiles'

type BlobProps = {
  trip_id: string
  folder: string
}

const Blob = async ({ trip_id, folder }: BlobProps) => {
  async function allFiles() {
    const blobs = await list({ prefix: folder })
    return blobs.blobs
  }

  const files = await allFiles()

  return (
    <>
      <BlobFiles files={files} folder={folder} />
      <BlobForm folder={folder} />
    </>
  )
}

export default Blob
