import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
  children: ReactNode
  ariaLabel?: string
}

export function Modal({ open, onClose, children, ariaLabel }: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(31, 39, 38, 0.2)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ scale: 0.92, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
            className="fixed inset-x-4 top-1/2 z-50 -translate-y-1/2 bg-white rounded-3xl overflow-hidden"
            style={{
              maxWidth: 360,
              margin: '0 auto',
              filter: 'drop-shadow(0px 4px 6px rgba(40, 68, 67, 0.08))',
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
