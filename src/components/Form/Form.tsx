'use client'
import Link from 'next/link'
import Button from '../Button/Button'
import { useState, useTransition } from 'react'
import { useFormState } from 'react-dom'

export type Input = {
  key: string
  label: string
  type: string
}

export type FormProps = {
  onSubmit: (formData: FormData) => Promise<{ message: string }>
  inputs: Input[]
  onCancelUrl: string
  title: string
}

export type FormState = {
  message: string
}
const initialState: FormState = {
  message: ''
}

const Form = ({ onSubmit, inputs, onCancelUrl, title }: FormProps) => {
  const handleSubmit = async (prevState: any, formData: FormData) => {
    const res: FormState = await onSubmit(formData)
    return res
  }
  const [state, formAction] = useFormState(handleSubmit, initialState)
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <form className="grid gap-4" action={formAction}>
        {inputs.map(({ key, label, type }) => (
          <div key={key} className="grid gap-1">
            <label htmlFor={key}>{label}</label>
            <input
              className="text-green-900 border border-green-900 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              type={type}
              id={key}
              name={key}
              required
            />
          </div>
        ))}
        <p className="text-green-300 mt-2 min-h-10">
          {(state as FormState).message}
        </p>
        <div className="flex gap-3 mt-3 ">
          <Button type="submit">Agregar</Button>
          <Link
            className="rounded-lg border-2 border-green-300 p-4 w-1/3 text-green-300"
            href={onCancelUrl}
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Form
