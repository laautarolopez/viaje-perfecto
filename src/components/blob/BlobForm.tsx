'use client'

import { upload } from '@/app/actions/blobActions'
import { useState, useTransition } from 'react'
import IconButton from '../IconButton'
import { FaFileUpload } from 'react-icons/fa'
import BlobModal from './BlobModal'

const BlobForm = ({ folder, fetchFiles }: { folder: string, fetchFiles: () => Promise<void> }) => {
  const [file, setFile] = useState<File | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      return
    }
    const form = new FormData()
    form.append('file-to-upload', file)
    form.append('folder', folder)

    startTransition(async () => {
      await upload(form)
      setShowModal(false)
      setFile(null)
      await fetchFiles()
    })
  }
  return (
    <form onSubmit={handleSubmit} className="mb-10">
      {showModal && (
        <BlobModal
          file={file}
          setFile={setFile}
          pending={pending}
          setShowModal={setShowModal}
        />
      )}
      <div className='flex justify-center items-center mt-5 rounded-xl relative hover:cursor-pointer hover:opacity-90 bg-transparent border border-dashed border-green-300 text-green-300 w-100 h-10' onClick={() => setShowModal(true)}>
        <FaFileUpload className='h-10' />
      </div>
    </form>
  )
}

export default BlobForm
