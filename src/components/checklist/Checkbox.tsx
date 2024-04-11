'use client'

import { useOptimistic } from 'react'
import { toggleChecklistItem } from '@/app/actions/checklist'

import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'

type CheckboxProps = {
  isChecked: boolean
  noteID: string
}

const Checkbox = ({ noteID, isChecked }: CheckboxProps) => {
  const [optimisticCheck, toggleOptimisticCheck] = useOptimistic(
    isChecked,
    (state) => !state
  )
  const toggleCheck = () => {
    toggleOptimisticCheck(optimisticCheck)
    toggleChecklistItem(noteID)
  }

  return (
    <>
      {(optimisticCheck ? MdCheckBox : MdCheckBoxOutlineBlank)({
        className: 'w-6 h-6 text-green-300 hover:cursor-pointer',
        onClick: toggleCheck
      })}
    </>
  )
}

export default Checkbox
