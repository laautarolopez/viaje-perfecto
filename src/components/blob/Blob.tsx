import { list } from '@vercel/blob'
import FileBlob from '../FileBlob'
import BlobForm from './BlobForm'

const Blob = async ({
  trip_id,
  fly_id
}: {
  trip_id: string
  fly_id: string
}) => {
  async function allFiles() {
    const folder = `${trip_id}/vuelos/${fly_id}`
    const blobs = await list({ prefix: folder })
    return blobs
  }

  const files = await allFiles()
  const folder = `${trip_id}/vuelos/${fly_id}`

  return (
    <>
      {files &&
        files.blobs
          .sort(
            (fileA, fileB) =>
              fileA.uploadedAt.getTime() - fileB.uploadedAt.getTime()
          )
          .map((file) => (
            <FileBlob
              key={file.url}
              filename={file.pathname.slice(folder.length + 1)}
              download={file.downloadUrl}
              deleteFilePath={file.url}
            />
          ))}
      <BlobForm trip_id={trip_id} fly_id={fly_id} />
    </>
  )
}

export default Blob
