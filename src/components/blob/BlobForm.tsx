'use client'

import { upload } from '@/app/actions/blobActions'
import { useState, useTransition } from 'react'
import IconButton from '../IconButton'
import { FaFileUpload } from 'react-icons/fa'
import BlogBG from './BlobBG'
import BlobFile from './BlobFile'
import BlobInput from './BloblInput'
import BlobModal from './BlobModal'

const BlobForm = ({ trip_id, fly_id }: { trip_id: string; fly_id: string }) => {
  const [file, setFile] = useState<File | null>(null)
  const [showNoFileError, setShowNoFileError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [pending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setShowNoFileError(true)
      return
    }
    const form = new FormData()
    form.append('file-to-upload', file)
    form.append('trip_id', trip_id)
    form.append('fly_id', fly_id)

    startTransition(async () => {
      await upload(form)
      setShowModal(false)
      setFile(null)
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
      <IconButton
        Icon={FaFileUpload}
        iconContainerClassName="bg-transparent border border-dashed border-green-300 text-green-300 w-100 h-10"
        iconClassName="h-10"
        onClick={() => setShowModal(true)}
      />
    </form>
  )
}

export default BlobForm
