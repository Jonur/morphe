import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { flushSync } from 'react-dom'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { AppBar } from '../components/ui/AppBar'
import { TextInput } from '../components/ui/TextInput'
import { ExerciseSearch } from '../components/ExerciseSearch'
import { Button } from '../components/ui/Button'
import { WorkoutSet } from '../types'

export function EditWorkoutScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { workouts, updateWorkout } = useWorkoutStore()
  const workout = workouts.find((w) => w.id === id)

  const [name, setName] = useState(workout?.name ?? '')
  const [selectedNames, setSelectedNames] = useState<string[]>(
    workout?.exercises.map((e) => e.name) ?? []
  )
  const [isClosing, setIsClosing] = useState(false)
  const [exitBack, setExitBack] = useState(false)

  if (!workout) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-4 px-4">
        <p className="text-base font-light text-patina">Workout not found.</p>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Go home
        </Button>
      </div>
    )
  }

  const toggle = (exerciseName: string) => {
    setSelectedNames((prev) =>
      prev.includes(exerciseName)
        ? prev.filter((n) => n !== exerciseName)
        : [...prev, exerciseName]
    )
  }

  const handleSave = () => {
    if (!name.trim() || selectedNames.length === 0) return

    const exerciseDefs = selectedNames.map((exerciseName) => {
      const existing = workout.exercises.find((e) => e.name === exerciseName)
      const defaultSet: WorkoutSet = {
        id: Math.random().toString(36).slice(2, 11),
        weight: 0,
        reps: 10,
        completed: false,
      }
      return {
        id: existing?.id,
        name: exerciseName,
        sets: existing?.sets ?? [defaultSet],
      }
    })

    updateWorkout(workout.id, name.trim(), exerciseDefs)
    navigate(`/workout/${workout.id}`, { replace: true })
  }

  const handleClose = () => {
    flushSync(() => setIsClosing(true))
    navigate('/home', { replace: true, state: { instant: true } })
  }

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={isClosing ? { opacity: 0 } : exitBack ? { x: '100%', opacity: 0 } : { x: '-30%', opacity: 0 }}
      transition={isClosing ? { duration: 0 } : { duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
      className="flex flex-col h-[100dvh]"
    >
      <AppBar
          mode="nav"
          title="Edit workout"
          onBack={() => {
            flushSync(() => setExitBack(true))
            navigate(`/workout/${workout.id}`, { state: { direction: 'back' } })
          }}
          onClose={handleClose}
        />

      <main className="flex-1 overflow-y-auto flex flex-col px-4 pt-6 pb-4 gap-6" id="main-content">
        <TextInput
          label="Workout name"
          placeholder="e.g. Push day"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onClear={() => setName('')}
          maxLength={60}
          aria-required="true"
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-base font-medium text-seaweed">Exercises</h2>
          <ExerciseSearch selected={selectedNames} onToggle={toggle} />
        </div>
      </main>

      <div className="flex-none px-4 pb-8 pt-4">
        <Button
          variant="primary"
          fullWidth
          disabled={!name.trim() || selectedNames.length === 0}
          onClick={handleSave}
          aria-label="Save changes"
        >
          Save changes
        </Button>
      </div>
    </motion.div>
  )
}
