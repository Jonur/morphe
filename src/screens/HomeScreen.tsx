import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { AppBar } from '../components/ui/AppBar'
import { WorkoutCard } from '../components/WorkoutCard'

export function HomeScreen() {
  const navigate = useNavigate()
  const workouts = useWorkoutStore((s) => s.workouts)

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-30%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      className="flex flex-col min-h-screen"
    >
      <AppBar mode="home" />

      <main className="flex-1 flex flex-col px-4 pt-2 pb-8 gap-3" id="main-content">
        {/* Workouts list */}
        <AnimatePresence mode="popLayout">
          {workouts.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm font-light text-sage text-center mt-8"
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

        {/* Create CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/create/name')}
          aria-label="Create new workout"
          className={[
            'w-full mt-2 flex items-center justify-center gap-2',
            'border border-dashed border-mist rounded-card py-4',
            'text-sm font-medium text-patina',
            'hover:bg-frost transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina',
          ].join(' ')}
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
          Create workout
        </motion.button>
      </main>
    </motion.div>
  )
}
