import { motion, AnimatePresence } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { Exercise } from '../types'
import { SetField } from './ui/SetField'
import { Checkbox } from './ui/Checkbox'

interface ExerciseCardProps {
  workoutId: string
  exercise: Exercise
  onAddSet: () => void
  onRemoveSet: () => void
  onUpdateSet: (setId: string, field: 'weight' | 'reps', value: number) => void
  onToggleSet: (setId: string) => void
}

export function ExerciseCard({
  exercise,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  onToggleSet,
}: ExerciseCardProps) {
  return (
    <article
      className="bg-white rounded-card shadow-soft border border-frost overflow-hidden"
      aria-label={`Exercise: ${exercise.name}`}
    >
      <div className="px-4 pt-4 pb-3">
        <h3 className="text-sm font-medium text-obsidian">{exercise.name}</h3>
      </div>

      <hr className="border-frost" />

      {/* Sets */}
      <div className="divide-y divide-frost">
        <AnimatePresence initial={false}>
          {exercise.sets.map((set, idx) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span
                  className="text-2xs font-medium text-sage tabular-nums w-4 text-center"
                  aria-label={`Set ${idx + 1}`}
                >
                  {idx + 1}
                </span>

                <div className="flex gap-3 flex-1">
                  <SetField
                    label="kg"
                    value={set.weight}
                    onChange={(v) => onUpdateSet(set.id, 'weight', v)}
                    step={2.5}
                    unit=""
                  />
                  <SetField
                    label="reps"
                    value={set.reps}
                    onChange={(v) => onUpdateSet(set.id, 'reps', v)}
                    step={1}
                  />
                </div>

                <Checkbox
                  checked={set.completed}
                  onChange={() => onToggleSet(set.id)}
                  label={`Mark set ${idx + 1} complete`}
                  size={22}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sets control row */}
      <hr className="border-frost" />
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-light text-sage">
          {exercise.sets.length} set{exercise.sets.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={onRemoveSet}
            disabled={exercise.sets.length <= 1}
            aria-label={`Remove last set from ${exercise.name}`}
            className="text-patina disabled:text-frost focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina rounded"
          >
            <Minus size={16} strokeWidth={2} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.85 }}
            type="button"
            onClick={onAddSet}
            aria-label={`Add set to ${exercise.name}`}
            className="text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina rounded"
          >
            <Plus size={16} strokeWidth={2} />
          </motion.button>
        </div>
      </div>
    </article>
  )
}
