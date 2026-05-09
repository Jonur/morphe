import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { SplashScreen } from './screens/SplashScreen'
import { HomeScreen } from './screens/HomeScreen'
import { NameWorkoutScreen } from './screens/NameWorkoutScreen'
import { AddExercisesScreen } from './screens/AddExercisesScreen'
import { ViewWorkoutScreen } from './screens/ViewWorkoutScreen'
import { EditWorkoutScreen } from './screens/EditWorkoutScreen'

export default function App() {
  const location = useLocation()

  return (
    <div
      className="relative w-full max-w-[390px] mx-auto min-h-screen overflow-x-hidden"
      role="application"
      aria-label="Morphe workout tracker"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-obsidian focus:text-white focus:rounded-lg focus:text-sm"
      >
        Skip to main content
      </a>

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/create/name" element={<NameWorkoutScreen />} />
          <Route path="/create/exercises" element={<AddExercisesScreen />} />
          <Route path="/workout/:id" element={<ViewWorkoutScreen />} />
          <Route path="/workout/:id/edit" element={<EditWorkoutScreen />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
