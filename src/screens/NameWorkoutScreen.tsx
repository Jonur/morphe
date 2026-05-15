import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { flushSync } from 'react-dom'
import { AppBar } from '../components/ui/AppBar'
import { TextInput } from '../components/ui/TextInput'
import { Button } from '../components/ui/Button'

export function NameWorkoutScreen() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [isClosing, setIsClosing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleContinue = () => {
    if (!name.trim()) return
    navigate('/create/exercises', { state: { workoutName: name.trim() } })
  }

  const handleClose = () => {
    flushSync(() => setIsClosing(true))
    navigate('/home', { replace: true })
  }

  return (
    <motion.div
      initial={{ x: 0, opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={isClosing ? { opacity: 0 } : { x: '-30%', opacity: 0 }}
      transition={isClosing ? { duration: 0 } : { duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      className="flex flex-col min-h-screen"
    >
      <AppBar mode="nav" title="New workout" onBack={() => navigate(-1)} onClose={handleClose} />

      <main className="flex-1 flex flex-col px-4 pt-6 pb-8 gap-6" id="main-content">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-seaweed">Name your workout</h2>
          <p className="text-base font-light text-patina">Give it a name you&apos;ll recognise.</p>
        </div>

        <TextInput
          ref={inputRef}
          placeholder="e.g. Push day, Leg day…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClear={() => { setName(''); inputRef.current?.focus() }}
          onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
          maxLength={60}
          aria-required="true"
          aria-label="Workout name"
        />

        <div className="mt-auto">
          <Button
            variant="primary"
            fullWidth
            disabled={!name.trim()}
            onClick={handleContinue}
            aria-label="Save and continue to add exercises"
          >
            Save and continue
          </Button>
        </div>
      </main>
    </motion.div>
  )
}
