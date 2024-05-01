import cx from 'classnames'
import { useFormStatus } from 'react-dom'

type ButtonProps = {
  children: React.ReactNode | string
  type: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}
const Button = ({ children, type, className, onClick }: ButtonProps) => {
  const { pending } = useFormStatus()

  return (
    <button
      disabled={pending}
      type={type}
      className={cx(
        'rounded-lg p-4 w-2/3 font-bold border-green-600 bg-green-300 text-green-900',
        className
      )}
      onClick={onClick}
    >
      {pending ? (
        <div className="animate-spin rounded-full mx-auto h-7 w-7 border-b-2 border-green-900" />
      ) : (
        children
      )}
    </button>
  )
}

export default Button
