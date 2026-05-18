import { motion } from 'framer-motion'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
  label?: string
  size?: number
}

// Ease curve that matches "ease in" feel requested — fast start, smooth settle
const FILL_EASE = [0.4, 0, 0.2, 1] as const

export function Checkbox({ checked, onChange, label, size = 20 }: CheckboxProps) {
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
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
      >
        {/*
          Circle: dew border when unchecked → solid rose fill when checked.
          Animates fill colour and stroke colour together so the border
          blends into the filled state without a visible pop.
        */}
        <motion.circle
          cx="10"
          cy="10"
          r="9"
          strokeWidth="2"
          initial={false}
          animate={{
            fill:   checked ? '#f65776' : 'rgba(0,0,0,0)',
            stroke: checked ? '#f65776' : '#D2E4E4',
          }}
          transition={{ duration: 0.22, ease: FILL_EASE }}
        />

        {/*
          Checkmark: strokes in left-to-right when checked, retracts instantly
          on uncheck. pathLength 0→1 drives stroke-dashoffset under the hood.
          Small delay lets the rose fill land first, then the stroke draws in.
        */}
        <motion.path
          d="M6 9.833 L8.917 12.75 L13.917 6.5"
          stroke="white"
          strokeWidth="1.8"
          fill="none"
          initial={false}
          animate={{
            pathLength: checked ? 1 : 0,
            opacity:    checked ? 1 : 0,
          }}
          transition={{
            pathLength: {
              duration: checked ? 0.3 : 0.15,
              ease: 'easeInOut',
              delay: checked ? 0.1 : 0,
            },
            opacity: {
              duration: 0.05,
              delay: checked ? 0.1 : 0,
            },
          }}
        />
      </svg>
    </button>
  )
}
