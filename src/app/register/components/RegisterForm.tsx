'use client'

import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'email', label: 'Correo', type: 'email' },
  { key: 'password', label: 'Contraseña', type: 'password' }
]
const RegisterForm = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  return (
    <FormProvider {...methods}>
      <Form
        inputs={inputs}
        navigateUrl="login"
        navigateText="Acceder"
        submitButtonText="Registrarse"
        onSubmit={(e: FieldValues) => {
          return Promise.resolve({ message: 'Register successful' })
        }}
        title="Regístra tu cuenta"
      />
    </FormProvider>
  )
}

export default RegisterForm
