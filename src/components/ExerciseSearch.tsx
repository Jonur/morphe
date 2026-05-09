import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, CheckCircle2, X } from 'lucide-react'
import { EXERCISES } from '../data/exercises'

interface ExerciseSearchProps {
  selected: string[]
  onToggle: (name: string) => void
}

export function ExerciseSearch({ selected, onToggle }: ExerciseSearchProps) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim()
    ? EXERCISES.filter((e) => e.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : EXERCISES.slice(0, 8)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }
    if (open) {
      document.addEventListener('mousedown', handler)
    }
    return () => document.removeEventListener('mousedown', handler)
  }, [open, handleClose])

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      {/* Search input */}
      <div className="relative">
        <label htmlFor="exercise-search" className="sr-only">
          Search exercises
        </label>
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sage pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id="exercise-search"
          type="search"
          autoComplete="off"
          placeholder="Search exercises…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls="exercise-listbox"
          aria-autocomplete="list"
          className={[
            'w-full pl-9 pr-4 py-3.5 rounded-2xl text-sm font-light text-obsidian placeholder:text-sage',
            'input-gradient border transition-colors duration-200',
            open ? 'border-mist' : 'border-dew',
            'outline-none focus-visible:ring-2 focus-visible:ring-patina',
          ].join(' ')}
        />
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            id="exercise-listbox"
            role="listbox"
            aria-label="Exercise suggestions"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="bg-haze rounded-2xl border border-frost shadow-soft overflow-hidden"
          >
            {results.map((name, i) => {
              const isSelected = selected.includes(name)
              return (
                <motion.li
                  key={name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                >
                  <button
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => onToggle(name)}
                    className={[
                      'w-full flex items-center justify-between px-4 py-3 text-sm text-left',
                      'input-gradient transition-colors duration-100 hover:bg-frost active:bg-dew',
                      i < results.length - 1 ? 'border-b border-frost' : '',
                      isSelected ? 'text-obsidian font-medium' : 'text-seaweed font-light',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  >
                    {name}
                    {isSelected && (
                      <CheckCircle2 size={16} className="text-coral flex-shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </motion.li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Selected exercises chips */}
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <p className="text-xs font-medium text-sage mb-2 tracking-wide">
              Selected ({selected.length})
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Selected exercises">
              {selected.map((name) => (
                <motion.li
                  key={name}
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                >
                  <span className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1.5 rounded-pill bg-frost border border-dew text-xs font-medium text-seaweed">
                    {name}
                    <button
                      type="button"
                      onClick={() => onToggle(name)}
                      aria-label={`Remove ${name}`}
                      className="flex items-center justify-center text-sage hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-patina rounded-full"
                    >
                      <X size={12} strokeWidth={2.5} />
                    </button>
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
