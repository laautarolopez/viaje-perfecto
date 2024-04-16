import BlobForm from './BlobForm'
import { ListBlobResultBlob, list } from '@vercel/blob'
import BlobFiles from './BlobFiles'

type BlobProps = {
  trip_id: string
  fly_id: string
}

const Blob = async ({ trip_id, fly_id }: BlobProps) => {
  async function allFiles() {
    const folder = `${trip_id}/vuelos/${fly_id}`
    const blobs = await list({ prefix: folder })
    return blobs.blobs
  }

  const files = await allFiles()
  const folder = `${trip_id}/vuelos/${fly_id}`

  return (
    <>
      <BlobFiles files={files} folder={folder} />
      <BlobForm trip_id={trip_id} fly_id={fly_id} />
    </>
  )
}

export default Blob
