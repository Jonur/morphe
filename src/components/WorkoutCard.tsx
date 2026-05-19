import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Workout } from '../types'
import { useWorkoutStore } from '../store/useWorkoutStore'
import { ContextMenu } from './ui/ContextMenu'
import { Modal } from './ui/Modal'
import { VerticalMenuIcon, ViewIcon, EditIcon, DuplicateIcon, DeleteIcon } from './ui/icons'

interface WorkoutCardProps {
  workout: Workout
}

export function WorkoutCard({ workout }: WorkoutCardProps) {
  const navigate = useNavigate()
  const { deleteWorkout, duplicateWorkout } = useWorkoutStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  const totalSets = workout.exercises.reduce((acc, e) => acc + e.sets.length, 0)
  const exerciseCount = workout.exercises.length

  const menuItems = [
    {
      label: 'View workout',
      icon: <ViewIcon size={16} />,
      onClick: () => navigate(`/workout/${workout.id}`),
    },
    {
      label: 'Edit workout',
      icon: <EditIcon size={16} />,
      onClick: () => navigate(`/workout/${workout.id}/edit`),
    },
    {
      label: 'Duplicate',
      icon: <DuplicateIcon size={16} />,
      onClick: () => duplicateWorkout(workout.id),
    },
    {
      label: 'Delete',
      icon: <DeleteIcon size={16} />,
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
        className="bg-white rounded-card border border-frost px-4 py-4 flex items-center justify-between"
        aria-label={`Workout: ${workout.name}`}
      >
        <button
          onClick={() => navigate(`/workout/${workout.id}`)}
          className="flex-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina rounded-lg"
          aria-label={`View ${workout.name}`}
        >
          <h3 className="text-base font-normal text-seaweed leading-tight">{workout.name}</h3>
          <p className="text-sm font-light text-patina mt-0.5">
            {exerciseCount} exercise{exerciseCount !== 1 ? 's' : ''} · {totalSets} set
            {totalSets !== 1 ? 's' : ''}
          </p>
        </button>

        <motion.button
          whileTap={{ scale: 0.82 }}
          onClick={(e) => {
            e.stopPropagation()
            setMenuOpen(true)
          }}
          aria-label={`Options for ${workout.name}`}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="w-8 h-8 flex items-center justify-center rounded-full -mr-0.5 text-sage hover:text-seaweed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina transition-colors"
        >
          <VerticalMenuIcon size={16} aria-hidden="true" />
        </motion.button>
      </motion.article>

      <ContextMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        ariaLabel={`${workout.name} options`}
      />

      {/* Delete confirmation modal */}
      <Modal open={deleteOpen} onClose={() => setDeleteOpen(false)} ariaLabel="Delete workout">
        <div className="p-6 flex flex-col items-center gap-5 text-center">
          {/* Icon */}
          <div
            className="flex items-center justify-center rounded-full p-3"
            style={{ background: 'rgba(234, 60, 94, 0.2)' }}
            aria-hidden="true"
          >
            <DeleteIcon size={24} className="text-coral" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-seaweed">Delete workout?</h2>
            <p className="text-base font-light text-seaweed">
              <span className="font-normal">&ldquo;{workout.name}&rdquo;</span> will be permanently
              removed.
            </p>
          </div>

          {/* Buttons — unequal widths per Figma */}
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setDeleteOpen(false)}
              aria-label="Cancel delete"
              className="flex items-center justify-center rounded-pill py-4 text-base font-medium text-obsidian border border-sage bg-transparent hover:bg-frost transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-patina"
              style={{ width: 157 }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                deleteWorkout(workout.id)
                setDeleteOpen(false)
              }}
              aria-label={`Confirm delete ${workout.name}`}
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
