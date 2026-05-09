import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppBar } from '../components/ui/AppBar'
import { ExerciseSearch } from '../components/ExerciseSearch'
import { Button } from '../components/ui/Button'
import { useWorkoutStore } from '../store/useWorkoutStore'

interface LocationState {
  workoutName?: string
}

export function AddExercisesScreen() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = (location.state as LocationState) ?? {}
  const workoutName = state.workoutName ?? 'New Workout'

  const addWorkout = useWorkoutStore((s) => s.addWorkout)
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    )
  }

  const handleSave = () => {
    if (selected.length === 0) return
    addWorkout(
      workoutName,
      selected.map((name) => ({ name, sets: 1 }))
    )
    navigate('/home', { replace: true })
  }

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-30%', opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      className="flex flex-col min-h-screen"
    >
      <AppBar mode="nav" title={workoutName} onBack={() => navigate(-1)} />

      <main className="flex-1 flex flex-col px-4 pt-4 pb-8 gap-6" id="main-content">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium text-obsidian">Add exercises</h2>
          <p className="text-sm font-light text-sage">Search and select exercises for this session.</p>
        </div>

        <div className="flex-1">
          <ExerciseSearch selected={selected} onToggle={toggle} />
        </div>

        <div className="mt-auto">
          <Button
            variant="primary"
            fullWidth
            disabled={selected.length === 0}
            onClick={handleSave}
            aria-label={`Save workout with ${selected.length} exercise${selected.length !== 1 ? 's' : ''}`}
          >
            Save workout
            {selected.length > 0 && (
              <span
                className="ml-1 w-5 h-5 rounded-full bg-white/20 text-xs flex items-center justify-center"
                aria-hidden="true"
              >
                {selected.length}
              </span>
            )}
          </Button>
        </div>
      </main>
    </motion.div>
  )
}
