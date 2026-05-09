import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

interface SetFieldProps {
  value: number
  onChange: (value: number) => void
  label: string
  unit?: string
  step?: number
  min?: number
}

export function SetField({ value, onChange, label, unit, step = 1, min = 0 }: SetFieldProps) {
  const increment = () => onChange(value + step)
  const decrement = () => onChange(Math.max(min, value - step))

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xs font-medium text-sage tracking-wide uppercase">{label}</span>
      <div className="flex items-center gap-2 input-gradient rounded-xl border border-dew px-2 py-1.5">
        <motion.button
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          className="text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina rounded"
        >
          <Minus size={14} strokeWidth={2.5} />
        </motion.button>

        <span className="text-sm font-medium text-obsidian tabular-nums" style={{ minWidth: 30, textAlign: 'center' }}>
          {value}
          {unit && <span className="text-xs text-patina ml-0.5">{unit}</span>}
        </span>

        <motion.button
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.1 }}
          type="button"
          onClick={increment}
          aria-label={`Increase ${label}`}
          className="text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina rounded"
        >
          <Plus size={14} strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  )
}
