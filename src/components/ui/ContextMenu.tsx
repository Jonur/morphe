import { ReactNode, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

export interface ContextMenuItem {
  label: string
  icon?: ReactNode
  onClick: () => void
  danger?: boolean
}

interface ContextMenuProps {
  open: boolean
  onClose: () => void
  items: ContextMenuItem[]
  ariaLabel?: string
}

export function ContextMenu({ open, onClose, items, ariaLabel }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const kbHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    setTimeout(() => document.addEventListener('mousedown', handler), 0)
    document.addEventListener('keydown', kbHandler)
    return () => {
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('keydown', kbHandler)
    }
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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(31, 39, 38, 0.12)' }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="menu"
            ref={ref}
            role="menu"
            aria-label={ariaLabel ?? 'Options'}
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="fixed right-4 top-[88px] z-50 w-52 rounded-2xl bg-white overflow-hidden"
            style={{ boxShadow: '0px 4px 12px 0px rgba(40, 68, 67, 0.08)' }}
          >
            {items.map((item, i) => (
              <motion.button
                key={item.label}
                role="menuitem"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  onClose()
                  item.onClick()
                }}
                className={[
                  'w-full flex items-center gap-3 px-5 py-4 text-base font-normal text-left',
                  'bg-white transition-colors duration-100 hover:bg-frost active:bg-dew',
                  i < items.length - 1 ? 'border-b border-frost' : '',
                  item.danger ? 'text-coral' : 'text-seaweed',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {item.icon && (
                  <span className="flex-shrink-0 text-current" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  )
}
