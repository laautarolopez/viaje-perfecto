'use client'

type ButtonProps = {
  text: string
  onClick: () => void
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 bg-transparent border border-green-300 border-solid text-green-300 rounded-lg text-base "
    >
      {text}
    </button>
  )
}

export default Button
