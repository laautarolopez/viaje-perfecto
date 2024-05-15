'use client'

import Form, { Input } from '@/components/Form/Form'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'

const inputs: Input[] = [
  { key: 'email', label: 'Correo', type: 'email' },
  { key: 'password', label: 'Contraseña', type: 'password' }
]
const LoginForm = () => {
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
        navigateUrl="register"
        navigateText="Regístrate"
        submitButtonText="Iniciar sesión"
        onSubmit={(e: FieldValues) => {
          return Promise.resolve({ message: 'Login successful' })
        }}
        title="Accede a tu cuenta"
      />
    </FormProvider>
  )
}

export default LoginForm
