import { ChevronLeft, MoreVertical } from 'lucide-react'
import { motion } from 'framer-motion'

interface AppBarHomeProps {
  mode: 'home'
}

interface AppBarNavProps {
  mode: 'nav'
  title: string
  onBack: () => void
  onMenu?: () => void
}

type AppBarProps = AppBarHomeProps | AppBarNavProps

export function AppBar(props: AppBarProps) {
  if (props.mode === 'home') {
    return (
      <header className="flex items-center justify-between px-5 pt-14 pb-2" role="banner">
        <h1
          className="font-display text-obsidian leading-none tracking-tight"
          style={{ fontSize: 28 }}
          aria-label="Morphe workout tracker"
        >
          morphe
        </h1>
      </header>
    )
  }

  const { title, onBack, onMenu } = props

  return (
    <header
      className="relative flex items-center justify-between px-4 pt-14 pb-3"
      role="banner"
    >
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onBack}
        aria-label="Go back"
        className="flex items-center justify-center w-9 h-9 -ml-1 rounded-full focus-visible:ring-2 focus-visible:ring-patina"
      >
        <ChevronLeft size={22} className="text-obsidian" strokeWidth={2} />
      </motion.button>

      <span
        className="absolute left-1/2 -translate-x-1/2 text-sm font-medium text-obsidian tracking-tight"
        aria-live="polite"
      >
        {title}
      </span>

      {onMenu ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenu}
          aria-label="Open menu"
          className="flex items-center justify-center w-9 h-9 -mr-1 rounded-full focus-visible:ring-2 focus-visible:ring-patina"
        >
          <MoreVertical size={20} className="text-obsidian" strokeWidth={2} />
        </motion.button>
      ) : (
        <div className="w-9" aria-hidden="true" />
      )}
    </header>
  )
}
