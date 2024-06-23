'use client'
import { ListBlobResultBlob } from '@vercel/blob'
import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import FileBlob from '../FileBlob'
import cx from 'classnames'

type BlobFilesProps = {
  files: ListBlobResultBlob[]
  folder: string
  fetchFiles: () => Promise<void>
  isImageFiles?: boolean
}

const BlobFiles = ({
  files,
  folder,
  fetchFiles,
  isImageFiles
}: BlobFilesProps) => {
  const [showFiles, setShowFiles] = useState(isImageFiles)

  const toogleShowFiles = () => setShowFiles(!showFiles)

  const getFileName = (file: ListBlobResultBlob) =>
    file.pathname.slice(folder.length + 1)

  return (
    <>
      {!isImageFiles && (
        <div className="flex justify-between items-center mt-10 mb-5">
          {<p className="font-bold text-xl">Archivos adjuntos</p>}{' '}
          {files.length > 0 && (
            <FaChevronDown
              onClick={toogleShowFiles}
              className={cx('text-green-300 w-6 h-6 hover:cursor-pointer', {
                'rotate-180': showFiles
              })}
            />
          )}
        </div>
      )}
      <div
        className={cx('grid gap-3', {
          'grid-cols-1': !isImageFiles,
          'grid-cols-2': isImageFiles
        })}
      >
        {showFiles &&
          files
            .sort(
              (fileA, fileB) =>
                fileA.uploadedAt.getTime() - fileB.uploadedAt.getTime()
            )
            .map((file) => (
              <FileBlob
                key={file.url}
                filename={getFileName(file)}
                download={file.downloadUrl}
                deleteFilePath={file.url}
                folder={folder}
                fetchFiles={fetchFiles}
                isImageFile={isImageFiles}
              />
            ))}
      </div>
    </>
  )
}

export default BlobFiles
