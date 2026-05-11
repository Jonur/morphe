import { motion } from 'framer-motion'
import { SubtractCircleIcon, AddCircleIcon } from './icons'

interface SetFieldProps {
  value: number
  onChange: (value: number) => void
  label: string
  unit?: string
  step?: number
  min?: number
}

export function SetField({ value, onChange, label, step = 1, min = 0 }: SetFieldProps) {
  const increment = () => onChange(value + step)
  const decrement = () => onChange(Math.max(min, value - step))

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="flex items-center gap-2 bg-gradient-to-b from-[#f9fafa] to-[#f4f7f7] rounded-2xl border border-frost px-2 py-2"
      >
        <motion.button
          whileTap={{ scale: 0.82 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          className="flex items-center justify-center w-6 h-6 bg-white rounded-full text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <SubtractCircleIcon size={16} aria-hidden="true" />
        </motion.button>

        <span
          className="text-base font-normal text-seaweed tabular-nums"
          style={{ minWidth: 28, textAlign: 'center' }}
        >
          {value}
        </span>

        <motion.button
          whileTap={{ scale: 0.82 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={increment}
          aria-label={`Increase ${label}`}
          className="flex items-center justify-center w-6 h-6 bg-white rounded-full text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <AddCircleIcon size={16} aria-hidden="true" />
        </motion.button>
      </div>
      <span className="text-xs font-light text-patina">{label}</span>
    </div>
  )
}
