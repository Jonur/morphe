import { InputHTMLAttributes, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ClearIcon } from './icons'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  onClear?: () => void
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  { label, error, className = '', id, onClear, value, ...rest },
  ref
) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hasValue = typeof value === 'string' ? value.length > 0 : false

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-base font-medium text-seaweed">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          value={value}
          className={[
            'w-full rounded-2xl py-4 px-4',
            onClear ? 'pr-10' : '',
            'text-base font-light text-obsidian placeholder:text-sage',
            'bg-gradient-to-r from-[#f9fafa] to-[#f4f7f7]',
            'border transition-colors duration-200 outline-none',
            error ? 'border-coral' : 'border-dew focus:border-mist',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        <AnimatePresence>
          {onClear && hasValue && (
            <motion.button
              key="clear"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.12 }}
              type="button"
              onClick={onClear}
              aria-label="Clear input"
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-sage hover:text-patina transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
            >
              <ClearIcon size={10} aria-hidden="true" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {error && (
        <span role="alert" className="text-xs text-coral font-light">
          {error}
        </span>
      )}
    </div>
  )
})
