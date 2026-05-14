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
      className="bg-white rounded-2xl border border-frost p-3 flex flex-col gap-2"
      aria-label={`Exercise: ${exercise.name}`}
    >
      {/* Exercise name */}
      <div className="px-2 py-3">
        <h3 className="text-base font-normal text-seaweed">{exercise.name}</h3>
      </div>

      <hr className="border-frost" />

      {/* Sets — no row dividers, spaced with gap */}
      <div className="px-2 py-3 flex flex-col gap-6">
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
              <div className="flex items-center justify-between">
                <SetField
                  label="kg"
                  value={set.weight}
                  onChange={(v) => onUpdateSet(set.id, 'weight', v)}
                  step={2.5}
                  min={0}
                  inputMode="decimal"
                />
                <SetField
                  label="rep"
                  value={set.reps}
                  onChange={(v) => onUpdateSet(set.id, 'reps', v)}
                  step={1}
                  min={1}
                  inputMode="numeric"
                />
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

      <hr className="border-frost" />

      {/* Sets control — subtract · N sets · add */}
      <div className="flex items-center justify-between px-2 py-2">
        <motion.button
          whileTap={{ scale: 0.82 }}
          type="button"
          onClick={onRemoveSet}
          disabled={exercise.sets.length <= 1}
          aria-label={`Remove last set from ${exercise.name}`}
          className="flex items-center justify-center bg-white rounded-full p-[2px] text-sage disabled:opacity-30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <SubtractIcon size={16} aria-hidden="true" />
        </motion.button>

        <div className="flex items-center gap-1.5">
          <span className="text-base font-normal text-seaweed tabular-nums">
            {exercise.sets.length}
          </span>
          <span className="text-xs font-light text-patina">
            {exercise.sets.length === 1 ? 'set' : 'sets'}
          </span>
        </div>

        <motion.button
          whileTap={{ scale: 0.82 }}
          type="button"
          onClick={onAddSet}
          aria-label={`Add set to ${exercise.name}`}
          className="flex items-center justify-center bg-white rounded-full p-[2px] text-sage focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina"
        >
          <AddIcon size={16} aria-hidden="true" />
        </motion.button>
      </div>
    </article>
  )
}
