import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export function SplashScreen() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home', { replace: true })
    }, 2200)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 flex items-center justify-center gradient-bg"
      aria-label="Morphe loading screen"
      role="status"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-obsidian select-none"
        style={{ fontSize: 48, letterSpacing: '0.96px' }}
        aria-label="Morphe"
      >
        morphe
      </motion.h1>
      <span className="sr-only">Loading…</span>
    </motion.div>
  )
}
