'use client'
import { FaFileDownload, FaTrashAlt } from 'react-icons/fa'
import { deleteFile } from '@/app/actions/blobActions'
import DeleteElement from '@/app/[id]/vuelos/components/DeleteElement'
import { useState } from 'react'

const FileBlob = ({
  filename,
  download,
  deleteFilePath,
  folder,
  fetchFiles,
  isImageFile
}: {
  filename: string
  download: string
  deleteFilePath: string
  folder: string
  fetchFiles: () => Promise<void>
  isImageFile?: boolean
}) => {
  const [isImageOpen, setImageOpen] = useState(false)

  const openImage = () => setImageOpen(true)

  const closeImage = () => setImageOpen(false)

  const renderImageFile = () => (
    <>
      <img
        src={download}
        alt={filename}
        className="w-full h-[120px] border border-green-300 text-green-300 rounded-xl object-cover"
        onClick={openImage}
      />
      {isImageOpen && (
        <div className="fixed inset-0 bg-black z-10 flex justify-center items-end flex-col">
          <button
            onClick={closeImage}
            className="my-5 text-white text-right mr-5"
          >
            Cerrar
          </button>
          <img
            src={download}
            alt={filename}
            className="max-w-full max-h-full mb-5"
          />
          <div className="mr-5">{deleteAndDownloadButtons()} </div>
        </div>
      )}
    </>
  )

  const deleteAndDownloadButtons = () => (
    <div className="flex items-center justify-center gap-3 ps-2 text-green-300">
      <a href={download} className=" flex items-center justify-center">
        <FaFileDownload className="w-5 h-5 max-w-5 max-h-5" />
      </a>
      <DeleteElement
        deleteElement={async () => {
          await deleteFile(deleteFilePath, folder)
          await fetchFiles()
        }}
        trashStyles={'w-5 h-5 max-w-5 max-h-5 flex items-center justify-center'}
      />
    </div>
  )
  const renderFile = () => (
    <div className="flex bg-cyan-900 items-center px-2 border border-green-300 text-green-300 rounded-xl w-100 h-10 mb-5 overflow-hidden truncate">
      <div className="w-5/6 overflow-hidden">{filename}</div>
      {deleteAndDownloadButtons()}
    </div>
  )
  return isImageFile ? renderImageFile() : renderFile()
}

export default FileBlob
