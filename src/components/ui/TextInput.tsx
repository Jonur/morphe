import { InputHTMLAttributes, forwardRef } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error, className = '', id, style, ...rest },
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
          'w-full rounded-2xl px-4 py-4',
          'text-base font-light text-obsidian placeholder:text-sage',
          'bg-gradient-to-r from-[#f9fafa] to-[#f4f7f7]',
          'border transition-colors duration-200',
          error ? 'border-coral' : 'border-dew',
          // Focus: inside border → mist, outside outline → dew
          'focus:border-mist focus:outline-none',
          'focus-visible:outline-2 focus-visible:outline-offset-0',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          // Outside 2px dew stroke on focus — handled via onFocus/onBlur to toggle outline
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.outline = '2px solid #D2E4E4'
          rest.onFocus?.(e)
        }}
        onBlur={(e) => {
          e.currentTarget.style.outline = 'none'
          rest.onBlur?.(e)
        }}
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
