export interface WorkoutSet {
  id: string
  weight: number
  reps: number
  completed: boolean
}

export interface Exercise {
  id: string
  name: string
  sets: WorkoutSet[]
}

export interface Workout {
  id: string
  name: string
  exercises: Exercise[]
  createdAt: string
  updatedAt: string
}
