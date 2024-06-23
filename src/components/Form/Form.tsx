'use client'
import Link from 'next/link'
import Button from '../Button/Button'
import { useFormState } from 'react-dom'
import { FieldValues, useForm, useFormContext } from 'react-hook-form'
import { useTransition } from 'react'

export type Input = {
  key: string
  label: string
  type: string
  extraInputProps?: Record<string, any>
}

export type FormProps = {
  onSubmit: (formData: FieldValues) => Promise<{ message: string }>
  inputs: Input[]
  submitButtonText?: string
  navigateUrl: string
  navigateText?: string
  title: string
  isEditing?: boolean
}

export type FormState = {
  message: string
}
const initialState: FormState = {
  message: ''
}

const Form = ({
  onSubmit,
  inputs,
  submitButtonText,
  navigateUrl,
  navigateText,
  title,
  isEditing
}: FormProps) => {
  const {
    register,
    handleSubmit: handleSubmitHook,
    formState: { isSubmitting }
  } = useFormContext()

  const [pending, setTransition] = useTransition()

  const handleSubmit = async (prevState: any, formData: FieldValues) => {
    const res: FormState = await onSubmit(formData)
    return res
  }
  const [state, formAction] = useFormState(handleSubmit, initialState)
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <form
        className="grid gap-4"
        onSubmit={handleSubmitHook((form) =>
          setTransition(() => {
            formAction(form)
          })
        )}
      >
        {inputs.map(({ key, label, type, extraInputProps }) => (
          <div key={key} className="grid gap-1">
            <label htmlFor={key}>{label}</label>
            <input
              className="text-green-900 border border-green-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              type={type}
              id={key}
              {...extraInputProps}
              {...register(key, { required: true })}
            />
          </div>
        ))}
        {(state as FormState).message ? (
          <p className="bg-red-600 text-white p-2 font-bold mt-2 min-h-10 rounded-xl">
            {(state as FormState).message}
          </p>
        ) : (
          <p className="text-white font-bold mt-2 min-h-10 rounded-xl"></p>
        )}
        <div className="flex gap-3 mt-3 ">
          <Button isLoading={pending} type="submit">
            {isEditing
              ? 'Editar'
              : submitButtonText
              ? submitButtonText
              : 'Agregar'}
          </Button>
          <Link
            className="text-center rounded-lg border-2 border-green-300 p-4 w-1/3 text-green-300"
            href={navigateUrl}
          >
            {navigateText ? navigateText : 'Cancelar'}
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Form
