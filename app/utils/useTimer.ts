import { useEffect, useState } from 'react'

export function useTimer(
  initialSeconds: number,
  isActive: boolean,
  onComplete: () => void
) {
  const [remaining, setRemaining] = useState(initialSeconds)

  useEffect(() => {
    setRemaining(initialSeconds)
  }, [initialSeconds])

  useEffect(() => {
    if (!isActive) return

    if (remaining <= 0) {
      onComplete()
      return
    }

    const id = setInterval(() => {
      setRemaining((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(id)
  }, [isActive, remaining, onComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return { formatTime, remaining, reset: () => setRemaining(initialSeconds) }
}