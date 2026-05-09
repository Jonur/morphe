import { useState } from 'react'
import { motion } from 'framer-motion'
import { MoreVertical, Pencil, Eye, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Workout } from '../types'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { ContextMenu } from './ui/ContextMenu'
import { Modal } from './ui/Modal'
import { Button } from './ui/Button'

interface WorkoutCardProps {
  workout: Workout
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const navigate = useNavigate()
  const deleteWorkout = useWorkoutStore((s) => s.deleteWorkout)
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const totalSets = workout.exercises.reduce((acc, e) => acc + e.sets.length, 0)
  const exerciseCount = workout.exercises.length

  const menuItems = [
    {
      label: 'View workout',
      icon: <Eye size={16} />,
      onClick: () => navigate(`/workout/${workout.id}`),
    },
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
      <motion.article
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-card shadow-soft border border-frost p-4 flex items-center justify-between"
        aria-label={`Workout: ${workout.name}`}
      >
        <button
          onClick={() => navigate(`/workout/${workout.id}`)}
          className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina rounded-lg"
          aria-label={`View ${workout.name}`}
        >
          <h3 className="text-sm font-medium text-obsidian leading-tight">{workout.name}</h3>
          <p className="text-xs font-light text-sage mt-0.5">
            {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''} · {totalSets} set
            {totalSets !== 1 ? 's' : ''}
          </p>
        </button>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(true)
          }}
          aria-label={`Options for ${workout.name}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="w-8 h-8 flex items-center justify-center rounded-full -mr-1 text-sage hover:text-obsidian focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina transition-colors"
        >
          <MoreVertical size={18} strokeWidth={2} />
        </motion.button>
      </motion.article>

      <ContextMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        ariaLabel={`${workout.name} options`}
      />

      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} ariaLabel="Delete workout">
        <div className="p-6 flex flex-col items-center gap-4 text-center">
          <div
            className="w-12 h-12 rounded-full bg-frost flex items-center justify-center"
            aria-hidden="true"
          >
            <Trash2 size={20} className="text-coral" />
          </div>
          <div>
            <h2 className="text-base font-medium text-obsidian">Delete workout?</h2>
            <p className="text-sm font-light text-sage mt-1">
              &ldquo;{workout.name}&rdquo; will be permanently removed.
            </p>
          </div>
          <div className="flex gap-3 w-full pt-1">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setDeleteOpen(false)}
              aria-label="Cancel delete"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              fullWidth
              onClick={() => {
                deleteWorkout(workout.id)
                setDeleteOpen(false)
              }}
              aria-label={`Confirm delete ${workout.name}`}
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
