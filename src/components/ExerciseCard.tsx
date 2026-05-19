import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Exercise } from '../types'
import { SetField } from './ui/SetField'
import { Checkbox } from './ui/Checkbox'
import { ContextMenu } from './ui/ContextMenu'
import { SubtractIcon, AddIcon, VerticalMenuIcon, DuplicateIcon } from './ui/icons'

interface ExerciseCardProps {
  workoutId: string
  exercise: Exercise
  onAddSet: () => void
  onRemoveSet: () => void
  onUpdateSet: (setId: string, field: 'weight' | 'reps', value: number) => void
  onToggleSet: (setId: string) => void
  onDuplicate: () => void
}

export function ExerciseCard({
  exercise,
  onAddSet,
  onRemoveSet,
  onUpdateSet,
  onToggleSet,
  onDuplicate,
}: ExerciseCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuPos, setMenuPos] = useState<{ top: number; right: number }>({ top: 88, right: 16 })
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const openMenu = () => {
    if (menuButtonRef.current) {
      const rect = menuButtonRef.current.getBoundingClientRect()
      setMenuPos({
        top: rect.bottom + 6,
        right: Math.round(window.innerWidth - rect.right),
      })
    }
    setMenuOpen(true)
  }

  const menuItems = [
    {
      label: 'Duplicate exercise',
      icon: <DuplicateIcon size={16} />,
      onClick: onDuplicate,
    },
  ]

  return (
    <>
      <article
        className="bg-white rounded-2xl border border-frost p-2 flex flex-col gap-2"
        aria-label={`Exercise: ${exercise.name}`}
      >
        {/* Exercise name + menu */}
        <div className="px-2 py-2 flex items-center justify-between">
          <h3 className="text-base font-normal text-seaweed">{exercise.name}</h3>
          <motion.button
            ref={menuButtonRef}
            whileTap={{ scale: 0.82 }}
            type="button"
            onClick={openMenu}
            aria-label={`Options for ${exercise.name}`}
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            className="flex items-center justify-center w-7 h-7 -mr-0.5 rounded-full text-sage hover:text-seaweed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina transition-colors"
          >
            <VerticalMenuIcon size={16} aria-hidden="true" />
          </motion.button>
        </div>

        <hr className="border-frost" />

        {/* Sets — gap reduced from 24px to 16px */}
        <div className="px-2 py-2 flex flex-col gap-4">
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

      <ContextMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={menuItems}
        ariaLabel={`${exercise.name} options`}
        position={menuPos}
      />
    </>
  )
}
