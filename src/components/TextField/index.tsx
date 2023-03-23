import { UseFormRegister } from 'react-hook-form'

type TextFieldProps = JSX.IntrinsicElements['input'] & {
  label: string
  error?: string
  name?: string
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  textarea?: boolean
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  register,
  name,
  textarea = false,
  ...inputProps
}: TextFieldProps) => {
  const labelClasses = error ? 'text-red-700' : 'text-gray-700'
  const inputClasses = error
    ? 'bg-red-50 border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500 placeholder-red-400'
    : 'bg-gray-50 border-gray-500 text-gray-900 focus:ring-gray-500 focus:border-gray-500 placeholder-gray-400'

  return (
    <div className='mb-4'>
      <label className={`block mb-2 text-sm font-medium ${labelClasses}`}>
        {label}
      </label>

      {textarea ? (
        <textarea
          rows={4}
          className={`border text-sm rounded-lg block w-full p-2.5 ${inputClasses}`}
          placeholder='Write your thoughts here...'
          {...(register && name ? register(name) : {})}
        />
      ) : (
        <input
          type='text'
          className={`border text-sm rounded-lg block w-full p-2.5 ${inputClasses}`}
          {...inputProps}
          {...(register && name ? register(name) : {})}
        />
      )}

      {error ? <p className='text-sm text-red-600'>{error}</p> : null}
    </div>
  )
}

export default TextField
