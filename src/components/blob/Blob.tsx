'use client'

import BlobForm from './BlobForm'
import { ListBlobResultBlob } from '@vercel/blob'
import { allFiles } from '@/app/actions/blobActions'
import BlobFiles from './BlobFiles'
import { useEffect, useState } from 'react'

type BlobProps = {
  folder: string
  isImageBlob?: boolean
}

const Blob = ({ folder, isImageBlob }: BlobProps) => {
  const [files, setFiles] = useState<ListBlobResultBlob[]>([])

  const fetchFiles = async () => {
    const blobs = await allFiles(folder)
    setFiles(blobs)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <>
      <BlobFiles
        files={files}
        folder={folder}
        fetchFiles={fetchFiles}
        isImageFiles={isImageBlob}
      />
      <BlobForm
        folder={folder}
        fetchFiles={fetchFiles}
        isImageForm={isImageBlob}
      />
    </>
  )
}

export default Blob
