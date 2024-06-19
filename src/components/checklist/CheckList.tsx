'use client'

import { Note } from '@/app/lib/types'
import AddNoteButton from '../AddNoteButton'
import CheckItem from './CheckItem'
import { addChecklistItem } from '@/app/actions/checklist'
import { useForm } from 'react-hook-form'
import { useOptimistic } from 'react'

type CheckListProps = {
  notes: Note[]
  tripId: string
}

const CheckList = ({ notes, tripId }: CheckListProps) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { description: '' }
  })
  const [optimisticNotes, setOptimisticNotes] = useOptimistic(
    notes,
    (prevNotes, note: Note) => [...prevNotes, note]
  )

  const submitForm = async (data: { description: string }) => {
    setOptimisticNotes({
      id: `temporal-id-${optimisticNotes.length + 1}`,
      description: data.description,
      is_checked: false,
      created_date: 'any-date',
      trip_id: tripId
    })
    reset()
    await addChecklistItem({ tripId, description: data.description })
  }

  return (
    <div className="flex flex-col mt-5 gap-5" data-testid="checklist">
      {optimisticNotes.map((note: Note) => (
        <CheckItem key={note.id} {...note} />
      ))}
      <form onSubmit={handleSubmit(submitForm)} className="grid gap-5">
        <input
          type="text"
          placeholder="Escribe tu nueva nota aquí"
          className=" text-green-900 border border-gray-300 focus-visible:outline-green-300 focus:border-green-300 rounded-md p-2 w-full"
          {...register('description', { required: true })}
        />
        <AddNoteButton />
      </form>
    </div>
  )
}
export default CheckList
