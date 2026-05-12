import { motion, AnimatePresence } from 'framer-motion'
import { Exercise } from '../types'
import { SetField } from './ui/SetField'
import { Checkbox } from './ui/Checkbox'
import { SubtractIcon, AddIcon } from './ui/icons'

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
      className="bg-white rounded-2xl border border-frost overflow-hidden"
      aria-label={`Exercise: ${exercise.name}`}
    >
      {/* Exercise name header */}
      <div className="px-5 py-4">
        <h3 className="text-base font-normal text-seaweed">{exercise.name}</h3>
      </div>

      <hr className="border-frost" />

      {/* Sets rows */}
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
              <div className="flex items-center gap-3 px-5 py-4">
                <span
                  className="text-base font-normal text-seaweed tabular-nums w-4 text-center"
                  aria-label={`Set ${idx + 1}`}
                >
                  {idx + 1}
                </span>

                <div className="flex gap-3 flex-1 justify-center">
                  <SetField
                    label="kg"
                    value={set.weight}
                    onChange={(v) => onUpdateSet(set.id, 'weight', v)}
                    step={2.5}
                    min={0}
                  />
                  <SetField
                    label="reps"
                    value={set.reps}
                    onChange={(v) => onUpdateSet(set.id, 'reps', v)}
                    step={1}
                    min={1}
                  />
                </div>

                <Checkbox
                  checked={set.completed}
                  onChange={() => onToggleSet(set.id)}
                  label={`Mark set ${idx + 1} complete`}
                  size={20}
                />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sets control row */}
      <hr className="border-frost" />
      <div className="flex items-center justify-between px-5 py-4">
        <span className="text-base font-normal text-seaweed">
          {exercise.sets.length} set{exercise.sets.length !== 1 ? 's' : ''}
        </span>

        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.82 }}
            type="button"
            onClick={onRemoveSet}
            disabled={exercise.sets.length <= 1}
            aria-label={`Remove last set from ${exercise.name}`}
            className="flex items-center justify-center w-6 h-6 bg-white rounded-full text-patina disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
          >
            <SubtractIcon size={16} aria-hidden="true" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.82 }}
            type="button"
            onClick={onAddSet}
            aria-label={`Add set to ${exercise.name}`}
            className="flex items-center justify-center w-6 h-6 bg-white rounded-full text-patina focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
          >
            <AddIcon size={16} aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </article>
  )
}
