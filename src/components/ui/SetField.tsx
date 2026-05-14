import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { SubtractIcon, AddIcon } from './icons'

interface SetFieldProps {
  value: number
  onChange: (value: number) => void
  label: string
  step?: number
  min?: number
  inputMode?: 'numeric' | 'decimal'
}

export function SetField({
  value,
  onChange,
  label,
  step = 1,
  min = 0,
  inputMode = 'numeric',
}: SetFieldProps) {
  const [localValue, setLocalValue] = useState(String(value))
  const inputRef = useRef<HTMLInputElement>(null)

  // Keep display in sync when value changes externally (e.g. +/- taps while field is unfocused)
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocalValue(String(value))
    }
  }, [value])

  const increment = () => {
    const next = value + step
    onChange(next)
    setLocalValue(String(next))
  }

  const decrement = () => {
    const next = Math.max(min, value - step)
    onChange(next)
    setLocalValue(String(next))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const handleBlur = () => {
    const parsed = parseFloat(localValue)
    if (!isNaN(parsed) && parsed >= min) {
      onChange(parsed)
      setLocalValue(String(parsed))
    } else {
      setLocalValue(String(value))
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      {/* Stepper card */}
      <div className="flex items-center gap-1.5 p-2 bg-gradient-to-b from-[#f9fafa] to-[#f4f7f7] border border-frost rounded-xl">
        <motion.button
          whileTap={{ scale: 0.82 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          className="flex items-center justify-center bg-white rounded-full p-[2px] text-sage focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <SubtractIcon size={16} aria-hidden="true" />
        </motion.button>

        <input
          ref={inputRef}
          type="text"
          inputMode={inputMode}
          value={localValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          aria-label={label}
          className="w-[30px] text-center text-base font-normal text-seaweed bg-transparent outline-none border-none caret-patina"
        />

        <motion.button
          whileTap={{ scale: 0.82 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={increment}
          aria-label={`Increase ${label}`}
          className="flex items-center justify-center bg-white rounded-full p-[2px] text-sage focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <AddIcon size={16} aria-hidden="true" />
        </motion.button>
      </div>

      {/* Inline label — sits to the right of the stepper on the same line */}
      <span className="text-xs font-light text-patina">{label}</span>
    </div>
  )
}
