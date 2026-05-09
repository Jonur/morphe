import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  size?: number
}

export function Checkbox({ checked, onChange, label, size = 24 }: CheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label ?? (checked ? 'Mark incomplete' : 'Mark complete')}
      onClick={onChange}
      className="flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina rounded-full"
      style={{ width: size, height: size }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {checked ? (
          <motion.span
            key="checked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="flex items-center justify-center rounded-full bg-coral"
            style={{ width: size, height: size }}
            aria-hidden="true"
          >
            <Check size={size * 0.5} className="text-white" strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="unchecked"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="rounded-full border-2 border-frost"
            style={{ width: size, height: size }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </button>
  )
}
