import { motion } from 'framer-motion'
import { BackArrowIcon, VerticalMenuIcon, CloseIcon } from './icons'

interface AppBarHomeProps {
  mode: 'home'
}

interface AppBarNavProps {
  mode: 'nav'
  title: string
  onBack: () => void
  onMenu?: () => void
  onClose?: () => void
}

type AppBarProps = AppBarHomeProps | AppBarNavProps

export function AppBar(props: AppBarProps) {
  if (props.mode === 'home') {
    return (
      <header className="flex items-center px-4 pt-6 pb-2" role="banner">
        <h1
          className="font-display text-seaweed leading-none select-none"
          style={{ fontSize: 28, letterSpacing: '0.56px' }}
          aria-label="Morphe workout tracker"
        >
          morphe
        </h1>
      </header>
    )
  }

  const { title, onBack, onMenu, onClose } = props

  return (
    <header
      className="relative flex items-center justify-between px-4 pt-6 py-2"
      role="banner"
    >
      <motion.button
        whileTap={{ scale: 0.88 }}
        onClick={onBack}
        aria-label="Go back"
        className="flex items-center justify-center w-9 h-9 -ml-1.5 rounded-full text-patina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
      >
        <BackArrowIcon size={24} aria-hidden="true" />
      </motion.button>

      <span
        className="absolute left-1/2 -translate-x-1/2 text-sm font-normal text-seaweed"
        aria-live="polite"
      >
        {title}
      </span>

      {onMenu ? (
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onMenu}
          aria-label="Open menu"
          className="flex items-center justify-center w-9 h-9 -mr-1.5 rounded-full text-patina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
        >
          <VerticalMenuIcon size={24} aria-hidden="true" />
        </motion.button>
      ) : onClose ? (
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={onClose}
          aria-label="Close and go home"
          className="flex items-center justify-center w-9 h-9 -mr-1.5 rounded-full text-patina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
        >
          <CloseIcon size={24} aria-hidden="true" />
        </motion.button>
      ) : (
        <div className="w-9" aria-hidden="true" />
      )}
    </header>
  )
}
