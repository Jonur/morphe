import { InputHTMLAttributes, forwardRef } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error, className = '', id, ...rest },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-normal text-seaweed">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        className={[
          'w-full rounded-2xl px-5 py-5',
          'text-base font-light text-obsidian placeholder:text-sage',
          'bg-gradient-to-r from-[#f9fafa] to-[#f4f7f7]',
          'border transition-colors duration-200',
          error ? 'border-coral' : 'border-dew focus:border-mist',
          'outline-none focus-visible:ring-2 focus-visible:ring-patina focus-visible:ring-offset-0',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
      {error && (
        <span role="alert" className="text-xs text-coral font-light">
          {error}
        </span>
      )}
    </div>
  )
})
