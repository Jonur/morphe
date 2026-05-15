import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, useLocation } from 'react-router-dom'
import { flushSync } from 'react-dom'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { AppBar } from '../components/ui/AppBar'
import { WorkoutCard } from '../components/WorkoutCard'
import { PlusIcon } from '../components/ui/icons'

export function HomeScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const workouts = useWorkoutStore((s) => s.workouts)
  const [exitInstant, setExitInstant] = useState(false)

  const instant = (location.state as { instant?: boolean } | null)?.instant ?? false

  const handleCreate = () => {
    flushSync(() => setExitInstant(true))
    navigate('/create/name')
  }

  return (
    <motion.div
      initial={instant ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={exitInstant ? { opacity: 1 } : { x: '-30%', opacity: 0 }}
      transition={exitInstant ? { duration: 0 } : { duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      className="flex flex-col min-h-[100dvh]"
    >
      <AppBar mode="home" />

      <main className="flex-1 flex flex-col px-4 pt-4 pb-8 gap-3" id="main-content">
        {/* Workouts list */}
        <AnimatePresence mode="popLayout">
          {workouts.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-base font-light text-patina text-center mt-8"
              aria-live="polite"
            >
              No workouts yet — create your first one below.
            </motion.p>
          ) : (
            workouts.map((workout, i) => (
              <motion.div
                key={workout.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <WorkoutCard workout={workout} />
              </motion.div>
            ))
          )}
        </AnimatePresence>

        {/* Create CTA — SVG background gives exact 4px dash / 4px gap on rounded border */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleCreate}
          aria-label="Create new workout"
          className="w-full mt-2 flex items-center justify-center gap-2 rounded-card py-4 text-base font-medium text-patina hover:bg-frost transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%2379a3a1' stroke-width='1' stroke-dasharray='4%2c4' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
          }}
        >
          <PlusIcon size={16} aria-hidden="true" />
          Create workout
        </motion.button>
      </main>
    </motion.div>
  )
}
