import { useEffect, useState, useRef } from 'react';
import { longBeep, shortBeep, speak } from './speak';
import { Exercise } from './useHIITContext';

export function useTimer(
  initialSeconds: number,
  isActive: boolean,
  onComplete: () => void,
  nextExerciseObj: Exercise | undefined,
  current: Exercise,
  soundEnabled: boolean
) {
  const [remaining, setRemaining] = useState(initialSeconds);
  const nextSpokenRef = useRef(false); // track if next exercise was announced

  // Reset timer and ref when exercise changes
  useEffect(() => {
    setRemaining(initialSeconds);
    nextSpokenRef.current = false;
  }, [initialSeconds, current]);

  useEffect(() => { 
    if (!isActive) return;

    // Announce next exercise at 5 seconds
    if (
      soundEnabled &&
      remaining === 5 &&
      nextExerciseObj &&
      !nextSpokenRef.current
    ) {
      
      if (nextExerciseObj.mode === 'reps') {
        speak(`${nextExerciseObj.name} ${String(nextExerciseObj.duration)} reps`);
      } else if (nextExerciseObj.mode !== 'complete') speak(`${nextExerciseObj.name} ${String(nextExerciseObj.duration)} seconds`);
      nextSpokenRef.current = true;
    }

    // Countdown beeps for current exercise
    if (soundEnabled) {
      if (remaining === 3 || remaining === 2) {
        shortBeep();
      } else if (remaining === 1) {
        longBeep()
      }
    }

    if (remaining <= 0) {
      onComplete();
      return;
    }

    const id = setInterval(() => {
      setRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isActive, remaining, onComplete, current, nextExerciseObj, soundEnabled]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return { formatTime, remaining, reset: () => setRemaining(initialSeconds) };
}