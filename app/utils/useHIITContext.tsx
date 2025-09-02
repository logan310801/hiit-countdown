'use client'

import { createContext, useContext, useState, useEffect } from "react"

export type Exercise = { 
  id?: string;
  name: string; 
  mode: 'timed' | 'reps' | 'rest' | 'complete'; // 👈 add rest
  duration: number;
  isRoundRest?: boolean; // optional flag if you want to style differently
  round?: number
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
  exerciseRest: number;
  setExerciseRest: React.Dispatch<React.SetStateAction<number>>;
  roundRest: number;
  setRoundRest: React.Dispatch<React.SetStateAction<number>>;
}

const HIITContext = createContext<HIITContextType | null>(null);

// Helper to build derived workout sequence
function buildWorkoutSequence(
  baseExercises: Exercise[],
  rounds: number,
  exerciseRest: number,
  roundRest: number
): Exercise[] {
  const sequence: Exercise[] = [];
  for (let r = 1; r <= rounds; r++) {
    baseExercises.forEach((ex, idx) => {
      sequence.push({ ...ex, id: `exerciseID-ex-${r}-${idx}`, round: r });
      const isLast = idx === baseExercises.length - 1;
      if (!isLast && exerciseRest > 0) {
        sequence.push({
          id: `exerciseRestID-ex-${r}-${idx}` ,
          name: 'Rest',
          mode: 'rest',
          duration: exerciseRest,
          round: r
        });
      }
      if (isLast && r < rounds && roundRest > 0) {
        sequence.push({
          id: `restRound-ID-${r}-${idx}` ,
          name: 'Round Rest',
          mode: 'rest',
          duration: roundRest,
          isRoundRest: true,
          round: r
        });
      }

      if (isLast && r === rounds) {
        sequence.push({
          id: `complete-ID-${r}-${idx}` ,
          name: 'Finish',
          mode: 'complete',
          duration: 0,
          round: r
        });
      }
    });
  }
  return sequence;
}

export function HIITProvider({ children }: {children: React.ReactNode}) {
  const [baseExercises, setBaseExercises] = useState<Exercise[]>([]);
  const [sequence, setSequence] = useState<Exercise[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rounds, setRounds] = useState(3);
  const [exerciseRest, setExerciseRest] = useState(5);
  const [roundRest, setRoundRest] = useState(30);

  useEffect(() => {
    setSequence(buildWorkoutSequence(baseExercises, rounds, exerciseRest, roundRest));
    setCurrentIndex(0);
  }, [baseExercises, rounds, exerciseRest, roundRest]);

  const addExercise = (ex: Exercise) => {
    setBaseExercises(prev => [...prev, ex]);
  };

  const deleteExercise = (id: string) => {
    setBaseExercises(prev => prev.filter(ex => ex.id !== id));
  };

  const nextExercise = () => {
    setCurrentIndex(prev => Math.min(prev + 1, sequence.length - 1));
  };

  const resetWorkout = () => {
    setCurrentIndex(0);
  };

  const clearExercises = () => {
    setBaseExercises([]);
  };

  return (
    <HIITContext.Provider
      value={{
        exercises: sequence,
        currentIndex,
        addExercise,
        deleteExercise,
        nextExercise,
        resetWorkout,
        clearExercises,
        rounds,
        setRounds,
        exerciseRest,
        setExerciseRest,
        roundRest,
        setRoundRest,
      }}
    >
      {children}
    </HIITContext.Provider>
  );
}

export function useHIIT() {
  const ctx = useContext(HIITContext)
  if (!ctx) {
    throw new Error("useHIIT must be used within a HIITProvider")
  }
  return ctx
}