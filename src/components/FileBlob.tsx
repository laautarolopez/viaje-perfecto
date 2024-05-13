'use client'
import { FaFileDownload, FaTrashAlt } from 'react-icons/fa'
import { deleteFile } from '@/app/actions/blobActions'

const FileBlob = ({
  filename,
  download,
  deleteFilePath,
  folder,
  fetchFiles
}: {
  filename: string
  download: string
  deleteFilePath: string
  folder: string
  fetchFiles: () => Promise<void>
}) => (
  <div className="flex bg-cyan-900 items-center px-2 border border-green-300 text-green-300 rounded-xl w-100 h-10 mb-5 overflow-hidden truncate">
    <div className="w-5/6 overflow-hidden">{filename}</div>
    <div className="flex items-center justify-center gap-3 ps-2">
      <a href={download} className=" flex items-center justify-center">
        <FaFileDownload className="w-5 h-5 max-w-5 max-h-5" />
      </a>
      <button
        className="w-5 h-5 max-w-5 max-h-5 flex items-center justify-center"
        onClick={async () => {
          await deleteFile(deleteFilePath, folder)
          await fetchFiles()
        }}
      >
        <FaTrashAlt className="w-5 h-5 max-w-5 max-h-5" />
      </button>
    </div>
  </div>
)

export default FileBlob
//se puede hacer el boton de delete solo client side
