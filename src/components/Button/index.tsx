import Spinner from '../Spinner'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: string | JSX.Element | (string | JSX.Element)[]
  loading?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  loading = false,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={`inline-flex items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 ${
        disabled ? 'cursor-not-allowed' : ''
      }`}
      {...buttonProps}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  )
}

export default Button
