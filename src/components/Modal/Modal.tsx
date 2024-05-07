import { useTransition } from 'react'
import Button from '../Button/Button'
import BlogBG from '../blob/BlobBG'

type ModalProps = {
  onConfirm: () => void
  onCancel: () => void
  children: React.ReactNode
}

const Modal = ({ onConfirm, onCancel, children }: ModalProps) => {
  const [pending, setTransition] = useTransition()
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto top-48"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <BlogBG />
        <div className="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg">
          <div className="bg-green-900 min-h-[144px] grid items-center px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
            <div className="bg-green-900 py-3 flex gap-3">
              <Button
                isLoading={pending}
                onClick={() => setTransition(onConfirm)}
                type="button"
                className="rounded-lg p-4 w-2/3 font-bold border-green-600 bg-green-300 text-green-900"
              >
                Confirmar
              </Button>
              <button
                type="button"
                className="rounded-lg border-2 border-green-300 p-4 w-1/3 text-green-300"
                onClick={onCancel}
                disabled={pending}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
