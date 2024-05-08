'use client'

import Modal from '@/components/Modal/Modal'
import { useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa'

type DeleteElementProps = {
  deleteElement: () => void
}

const DeleteElement = ({ deleteElement }: DeleteElementProps) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  return (
    <>
      <button
        type="button"
        className="bg-transparent"
        onClick={() => setShowConfirmationModal(true)}
      >
        <FaTrashAlt className="text-green-300 w-4 h-4 max-w-4 max-h-4" />
      </button>
      {showConfirmationModal && (
        <Modal
          onConfirm={() => {
            deleteElement()
            setShowConfirmationModal(false)
          }}
          onCancel={() => setShowConfirmationModal(false)}
        >
          <p>¿Estás seguro que deseas eliminar este elemento?</p>
        </Modal>
      )}
    </>
  )
}

export default DeleteElement
