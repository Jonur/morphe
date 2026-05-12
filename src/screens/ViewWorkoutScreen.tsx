import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { AppBar } from '../components/ui/AppBar'
import { ExerciseCard } from '../components/ExerciseCard'
import { ContextMenu } from '../components/ui/ContextMenu'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import { PencilIcon, TrashIcon } from '../components/ui/icons'

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
        <p className="text-base font-light text-patina">Workout not found.</p>
        <Button variant="ghost" onClick={() => navigate('/home')}>
          Go home
        </Button>
      </div>
    )
  }

  const menuItems = [
    {
      label: 'Edit workout',
      icon: <PencilIcon size={20} />,
      onClick: () => navigate(`/workout/${workout.id}/edit`),
    },
    {
      label: 'Delete',
      icon: <TrashIcon size={20} />,
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

        <main className="flex-1 flex flex-col px-4 pt-4 pb-8 gap-3" id="main-content">
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
        <div className="p-6 flex flex-col items-center gap-5 text-center">
          <div
            className="flex items-center justify-center rounded-full p-3"
            style={{ background: 'rgba(234, 60, 94, 0.2)' }}
            aria-hidden="true"
          >
            <TrashIcon size={24} className="text-coral" />
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-seaweed">Delete workout?</h2>
            <p className="text-base font-light text-seaweed">
              <span className="font-normal">&ldquo;{workout.name}&rdquo;</span> will be permanently
              removed.
            </p>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={() => setDeleteOpen(false)}
              className="flex items-center justify-center rounded-pill py-4 text-base font-medium text-obsidian border border-sage bg-transparent hover:bg-frost transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
              style={{ width: 157 }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteWorkout(workout.id)
                navigate('/home', { replace: true })
              }}
              className="flex items-center justify-center rounded-pill py-4 text-base font-medium text-white bg-coral hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              style={{ width: 152 }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
