import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const LETTERS = 'morphe'.split('')

// Letter stagger: 6 letters × 0.1s delay + 0.3s fade = all visible by ~0.9s
// Hold: 0.5s
// Fade out all together at 1.4s, navigate at 1.9s
const FADE_OUT_DELAY = 1400
const NAV_DELAY = 1900

export function SplashScreen() {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const outTimer = setTimeout(() => setLeaving(true), FADE_OUT_DELAY)
    const navTimer = setTimeout(() => navigate('/home', { replace: true }), NAV_DELAY)
    return () => {
      clearTimeout(outTimer)
      clearTimeout(navTimer)
    }
  }, [navigate])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center splash-bg"
      aria-label="Morphe loading screen"
      role="status"
    >
      {/* Fade the whole word out together once leaving=true */}
      <motion.h1
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="font-display text-obsidian select-none flex"
        style={{ fontSize: 48, letterSpacing: '0.96px' }}
        aria-label="Morphe"
      >
        {LETTERS.map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3, ease: 'easeOut' }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>

      <span className="sr-only">Loading…</span>
    </motion.div>
  )
}
