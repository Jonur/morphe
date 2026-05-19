import { create } from 'zustand'
import { Workout, Exercise, WorkoutSet } from '../types'

function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

function now(): string {
  return new Date().toISOString()
}

interface WorkoutStore {
  workouts: Workout[]

  // Workout CRUD
  addWorkout: (name: string, exercises: { name: string; sets: number }[]) => string
  duplicateWorkout: (id: string) => void
  deleteWorkout: (id: string) => void
  updateWorkout: (
    id: string,
    name: string,
    exercises: { id?: string; name: string; sets: WorkoutSet[] }[]
  ) => void

  // Exercise mutations
  duplicateExercise: (workoutId: string, exerciseId: string) => void

  // Set mutations (used during active workout / view)
  addSet: (workoutId: string, exerciseId: string) => void
  removeLastSet: (workoutId: string, exerciseId: string) => void
  updateSet: (
    workoutId: string,
    exerciseId: string,
    setId: string,
    field: 'weight' | 'reps',
    value: number
  ) => void
  toggleSetComplete: (workoutId: string, exerciseId: string, setId: string) => void
}

function makeDefaultSet(): WorkoutSet {
  return { id: generateId(), weight: 0, reps: 10, completed: false }
}

export const useWorkoutStore = create<WorkoutStore>((set, get) => ({
  workouts: [],

  addWorkout(name, exerciseDefs) {
    const id = generateId()
    const workout: Workout = {
      id,
      name,
      exercises: exerciseDefs.map((e) => ({
        id: generateId(),
        name: e.name,
        sets: Array.from({ length: e.sets }, makeDefaultSet),
      })),
      createdAt: now(),
      updatedAt: now(),
    }
    set((s) => ({ workouts: [workout, ...s.workouts] }))
    return id
  },

  duplicateWorkout(id) {
    const { workouts } = get()
    const original = workouts.find((w) => w.id === id)
    if (!original) return

    // Strip any existing "(N)" suffix to get the base name, then find the
    // next free number: "Push day" → "Push day (1)" → "Push day (2)" …
    const baseName = original.name.replace(/\s*\(\d+\)$/, '')
    const existingNumbers = workouts
      .map((w) => {
        const m = w.name.match(new RegExp(`^${baseName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*\\((\\d+)\\)$`))
        return m ? parseInt(m[1], 10) : null
      })
      .filter((n): n is number => n !== null)
    const nextNum = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1
    const newName = `${baseName} (${nextNum})`

    const duplicate: Workout = {
      id: generateId(),
      name: newName,
      exercises: original.exercises.map((e) => ({
        id: generateId(),
        name: e.name,
        sets: e.sets.map((st) => ({
          id: generateId(),
          weight: st.weight,
          reps: st.reps,
          completed: false,
        })),
      })),
      createdAt: now(),
      updatedAt: now(),
    }
    // Insert immediately after the original
    set((s) => {
      const idx = s.workouts.findIndex((w) => w.id === id)
      const updated = [...s.workouts]
      updated.splice(idx + 1, 0, duplicate)
      return { workouts: updated }
    })
  },

  deleteWorkout(id) {
    set((s) => ({ workouts: s.workouts.filter((w) => w.id !== id) }))
  },

  updateWorkout(id, name, exerciseDefs) {
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== id) return w
        return {
          ...w,
          name,
          exercises: exerciseDefs.map((e) => ({
            id: e.id ?? generateId(),
            name: e.name,
            sets: e.sets,
          })),
          updatedAt: now(),
        }
      }),
    }))
  },

  duplicateExercise(workoutId, exerciseId) {
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== workoutId) return w
        const idx = w.exercises.findIndex((e) => e.id === exerciseId)
        if (idx === -1) return w
        const original = w.exercises[idx]
        const duplicate: Exercise = {
          id: generateId(),
          name: original.name,
          sets: original.sets.map((st) => ({
            id: generateId(),
            weight: st.weight,
            reps: st.reps,
            completed: false,
          })),
        }
        const exercises = [
          ...w.exercises.slice(0, idx + 1),
          duplicate,
          ...w.exercises.slice(idx + 1),
        ]
        return { ...w, exercises, updatedAt: now() }
      }),
    }))
  },

  addSet(workoutId, exerciseId) {
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== workoutId) return w
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            if (e.id !== exerciseId) return e
            return { ...e, sets: [...e.sets, makeDefaultSet()] }
          }),
          updatedAt: now(),
        }
      }),
    }))
  },

  removeLastSet(workoutId, exerciseId) {
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== workoutId) return w
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            if (e.id !== exerciseId) return e
            if (e.sets.length <= 1) return e
            return { ...e, sets: e.sets.slice(0, -1) }
          }),
          updatedAt: now(),
        }
      }),
    }))
  },

  updateSet(workoutId, exerciseId, setId, field, value) {
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== workoutId) return w
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            if (e.id !== exerciseId) return e
            return {
              ...e,
              sets: e.sets.map((st) => (st.id === setId ? { ...st, [field]: value } : st)),
            }
          }),
        }
      }),
    }))
  },

  toggleSetComplete(workoutId, exerciseId, setId) {
    const workout = get().workouts.find((w) => w.id === workoutId)
    const exercise = workout?.exercises.find((e) => e.id === exerciseId)
    const theSet = exercise?.sets.find((s) => s.id === setId)
    if (!theSet) return
    set((s) => ({
      workouts: s.workouts.map((w) => {
        if (w.id !== workoutId) return w
        return {
          ...w,
          exercises: w.exercises.map((e) => {
            if (e.id !== exerciseId) return e
            return {
              ...e,
              sets: e.sets.map((st) =>
                st.id === setId ? { ...st, completed: !st.completed } : st
              ),
            }
          }),
        }
      }),
    }))
  },
}))
