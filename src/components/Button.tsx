'use client'

type ButtonProps = {
  text: string
  onClick?: () => void
  type: string
}

const Button = ({ text, onClick, type }: ButtonProps) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="px-4 py-2 bg-transparent border border-green-300 border-solid text-green-300 rounded-lg text-base "
    >
      {text}
    </button>
  )
}

export default Button
