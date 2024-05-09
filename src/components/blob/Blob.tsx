'use client'

import BlobForm from './BlobForm'
import { ListBlobResultBlob } from '@vercel/blob'
import { allFiles } from '@/app/actions/blobActions'
import BlobFiles from './BlobFiles'
import { useEffect, useState } from 'react'

type BlobProps = {
  trip_id: string
  folder: string
}

const Blob = ({ folder }: BlobProps) => {
  const [files, setFiles] = useState<ListBlobResultBlob[]>([])
  useEffect(() => {
    const fetchFiles = async () => {
      const blobs = await allFiles(folder)
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
