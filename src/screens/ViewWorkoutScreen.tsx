import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Pencil, Trash2 } from 'lucide-react'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { AppBar } from '../components/ui/AppBar'
import { ExerciseCard } from '../components/ExerciseCard'
import { ContextMenu } from '../components/ui/ContextMenu'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'

export function ViewWorkoutScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { workouts, deleteWorkout, addSet, removeLastSet, updateSet, toggleSetComplete } =
    useWorkoutStore()

  const workout = workouts.find((w) => w.id === id)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  if (!workout) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center gap-4 px-4">
        <p className="text-sm text-sage">Workout not found.</p>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Go home
        </Button>
      </div>
    )
  }

  const menuItems = [
    {
      label: 'Edit workout',
      icon: <Pencil size={16} />,
      onClick: () => navigate(`/workout/${workout.id}/edit`),
    },
    {
      label: 'Delete',
      icon: <Trash2 size={16} />,
      onClick: () => setDeleteOpen(true),
      danger: true,
    },
  ]

  return (
    <>
      <motion.div
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-30%', opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0, 0.67, 0] }}
        className="flex flex-col min-h-screen"
      >
        <AppBar
          mode="nav"
          title={workout.name}
          onBack={() => navigate('/home')}
          onMenu={() => setMenuOpen(true)}
        />

        <main className="flex-1 flex flex-col px-4 pt-2 pb-8 gap-3" id="main-content">
          <AnimatePresence initial={false}>
            {workout.exercises.map((exercise, i) => (
              <motion.div
                key={exercise.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <ExerciseCard
                  workoutId={workout.id}
                  exercise={exercise}
                  onAddSet={() => addSet(workout.id, exercise.id)}
                  onRemoveSet={() => removeLastSet(workout.id, exercise.id)}
                  onUpdateSet={(setId, field, value) =>
                    updateSet(workout.id, exercise.id, setId, field, value)
                  }
                  onToggleSet={(setId) => toggleSetComplete(workout.id, exercise.id, setId)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
      </motion.div>

      <ContextMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        ariaLabel={`${workout.name} options`}
      />

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} ariaLabel="Delete workout">
        <div className="p-6 flex flex-col items-center gap-4 text-center">
          <div className="w-12 h-12 rounded-full bg-frost flex items-center justify-center" aria-hidden="true">
            <Trash2 size={20} className="text-coral" />
          </div>
          <div>
            <h2 className="text-base font-medium text-obsidian">Delete workout?</h2>
            <p className="text-sm font-light text-sage mt-1">
              &ldquo;{workout.name}&rdquo; will be permanently removed.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-1">
            <Button variant="secondary" fullWidth onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                deleteWorkout(workout.id)
                navigate('/home', { replace: true })
              }}
              className="!bg-coral hover:!bg-rose"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
