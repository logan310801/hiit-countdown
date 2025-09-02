'use client'

import { createContext, useContext, useState } from "react"

export type Exercise = { 
  id: string;
  name: string; 
  mode: 'timed' | 'reps'
  duration: number
}

type HIITContextType = {
  exercises: Exercise[];
  currentIndex: number;
  addExercise: (ex: Exercise) => void;
  deleteExercise: (id: string) => void;
  nextExercise: () => void;
  resetWorkout: () => void;
  clearExercises: () => void;
  rounds: number;
  setRounds: React.Dispatch<React.SetStateAction<number>>;
  currentRound: number;
}

const HIITContext = createContext<HIITContextType | null>(null);

export function HIITProvider({ children }: {children: React.ReactNode}) {
  const restPeriod: Exercise = {
    name: 'Rest period',
    mode: 'timed',
    duration: 90,
    id: 'boilerplate'
  }
  const [exercises, setExercises] = useState<Exercise[]>([restPeriod])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rounds, setRounds] = useState(3)
  const [currentRound, setCurrentRound] = useState(1)

  const addExercise = (ex: Exercise) => {
    setExercises((prev) => [...prev, ex])
  }

  const deleteExercise = (id: string) => {
    setExercises((prev) => prev.filter((ex) => ex.id !== id));
  }

  const nextExercise = () => {
    if (currentIndex + 1 < exercises.length) {
      setCurrentIndex(currentIndex + 1)
    } else if (currentRound < rounds) {
      setCurrentIndex(0)
      setCurrentRound(currentRound + 1)
    } else {
      // workout complete
      console.log("Workout complete!")
    }
  }

  const resetWorkout = () => {
    setCurrentIndex(0)
    setCurrentRound(1)
  }

  const clearExercises = () => {
    setExercises([])
  }

  return (
    <HIITContext.Provider
      value={{
        exercises,
        currentIndex,
        addExercise,
        deleteExercise,
        nextExercise,
        resetWorkout,
        clearExercises,
        rounds,
        setRounds,
        currentRound
      }}
    >
      {children}
    </HIITContext.Provider>
  );
}

// ⬇️ This is the missing piece
export function useHIIT() {
  const ctx = useContext(HIITContext)
  if (!ctx) {
    throw new Error("useHIIT must be used within a HIITProvider")
  }
  return ctx
}