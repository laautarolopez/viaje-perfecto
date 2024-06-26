import { FC } from 'react'
import BlogBG from './BlobBG'
import BlobFile from './BlobFile'
import BlobInput from './BloblInput'
import Button from '../Button/Button'
import { createPortal } from 'react-dom'
interface BlobModalProps {
  file: File | null
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  pending: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isImageModal?: boolean
}

const BlobModal: FC<BlobModalProps> = ({
  file,
  setFile,
  pending,
  setShowModal,
  onSubmit,
  isImageModal
}) => {
  const modalRoot = document.getElementById('modals-root')
  if (!modalRoot) {
    throw new Error("Could not find element with id 'modals-root'")
  }
  return createPortal(
    <form
      onSubmit={onSubmit}
      className="fixed z-10 w-[100vw] h-[100vh] overflow-y-auto top-48"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <BlogBG />
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg">
          <div className="bg-green-900 h-[144px] grid items-end px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {file ? (
              <BlobFile
                fileName={file.name}
                onDeleteClick={() => setFile(null)}
              />
            ) : (
              <p className="justify-self-center">Agrega un archivo</p>
            )}
            <BlobInput
              disabled={pending}
              onInputChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              isImageInput={isImageModal}
            />
          </div>
          <div className="bg-green-900 px-4 py-3 flex gap-3">
            <Button
              disabled={pending || !file}
              isLoading={pending}
              type="submit"
              className="rounded-lg p-4 w-2/3 font-bold border-green-600 bg-green-300 text-green-900"
            >
              Confirmar
            </Button>
            <button
              type="button"
              className="rounded-lg border-2 border-green-300 p-4 w-1/3 text-green-300"
              onClick={() => {
                setFile(null)
                setShowModal(false)
              }}
              disabled={pending}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </form>,
    modalRoot
  )
}

export default BlobModal
