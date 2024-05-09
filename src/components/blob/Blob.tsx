'use client'

import BlobForm from './BlobForm'
import { ListBlobResultBlob, list } from '@vercel/blob'
import BlobFiles from './BlobFiles'
import { useEffect, useState } from 'react'

type BlobProps = {
  trip_id: string
  folder: string
}

const Blob = async ({ trip_id, folder }: BlobProps) => {
  // async function allFiles() {
  //   const blobs = await list({ prefix: folder })
  //   return blobs.blobs
  // }
  const [files, setFiles] = useState<ListBlobResultBlob[]>([])
  useEffect(() => {
    const fetchFiles = async () => {
      const blobs = await allFiles()
      setFiles(blobs)
    }

    fetchFiles()
  }, [])

  return (
    <>
      <BlobFiles files={files} folder={folder} />
      <BlobForm folder={folder} />
    </>
  )
}

export default Blob
