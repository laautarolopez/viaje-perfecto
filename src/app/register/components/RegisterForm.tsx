'use client'

import { register } from '@/app/actions/auth'
import { UserCredentials } from '@/app/lib/types'
import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'email', label: 'Correo', type: 'email' },
  { key: 'password', label: 'Contraseña', type: 'password' }
]
const RegisterForm = () => {
  const methods = useForm<UserCredentials>({
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
          const { email, password } = e as UserCredentials
          return register(email, password)
        }}
        title="Regístra tu cuenta"
      />
    </FormProvider>
  )
}

export default RegisterForm
