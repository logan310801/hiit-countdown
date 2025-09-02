import { Title, Text, Paper, Group, Button, Card, Grid } from '@mantine/core'
import { useTimer } from '../utils/useTimer'
import { useHIIT } from '../utils/useHIITContext'
import { useState, useEffect } from 'react'

export const Timer = () => {
  // Timer countdown state
  const [isRunning, setIsRunning] = useState(false)
  // Workout active state (true while user is in a workout, regardless of exercise mode)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)

  const { 
    exercises, 
    resetWorkout, 
    currentIndex, 
    nextExercise, 
    rounds, 
    setRounds, 
    currentRound 
  } = useHIIT()
  const current = exercises[currentIndex]

  const { remaining, formatTime, reset } = useTimer(
    current?.duration ?? 0,
    current?.mode === 'timed' && isRunning,
    () => {
      if (current?.mode === 'timed') {
        handleNext()
      }
    }
  )

  const nextIndex = currentIndex + 1
  const totalExercises = exercises.length

  let nextExerciseObj
    if (nextIndex < totalExercises) {
      nextExerciseObj = exercises[nextIndex]
    } else {
      nextExerciseObj = exercises[0]
    }

  // Ensure first exercise of each round handles UI correctly
  useEffect(() => {
    if (!current) return
    if (current?.mode === 'reps') {
      setIsRunning(false)
    }
  }, [current])

  const handleStart = () => {
    setIsWorkoutActive(true)
    if (current?.mode === 'timed') setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    resetWorkout()
    setIsRunning(false)
    setIsWorkoutActive(false)
  }

  const handleNext = () => {
    nextExercise() // updates currentIndex in context
    reset()        // reset timer for the new current

    // Only start timer automatically if the next exercise is timed
    setIsRunning(nextExerciseObj.mode === 'timed' && isWorkoutActive)
  }

  const handleRoundChange = () => {
    setRounds(prev => (prev < 5 ? prev + 1 : 1))
  }

  return (
    <>
      <Paper withBorder shadow='lg' radius='md' p='lg'>

        <Title ta='center' size={35}>
        Round {currentRound} / {rounds}
        </Title>

        <Card m='sm'>
            <Title ta='center' size={100}>
            {current?.mode === 'timed' ? formatTime(remaining) : remaining}
            </Title>
        </Card>
        
        <Card m='sm'>
            <Grid>
                <Grid.Col span={6}>

                    <Text >
                    Current exercise
                    </Text>

                    <Text >
                    {current?.name ?? '-'}
                    </Text>

                </Grid.Col>
                <Grid.Col span={6}>

                    <Text opacity='50%'>
                    Next exercise
                    </Text>

                    <Text opacity='50%'>
                    {nextExerciseObj?.name ?? '-'}
                    </Text>

                </Grid.Col>
            </Grid>
        </Card>
        
      </Paper>

      <Paper withBorder shadow='lg' radius='md' p='lg'>
        <Group justify='center'>
          <Button
            disabled={isWorkoutActive}
            color='green'
            onClick={handleStart}
          >
            Start
          </Button>
          <Button onClick={handleReset} color='blue'>
            Reset
          </Button>
          <Button disabled={!isRunning} onClick={handleStop} color='red'>
            Stop
          </Button>
          <Button
            disabled={current?.mode === 'timed'}
            onClick={handleNext}
            color='grape'
          >
            Next
          </Button>
          <Button
            onClick={handleRoundChange}
            disabled={isWorkoutActive}
            color={`red.${rounds + 4}`}
          >
            Rounds {rounds}
          </Button>
        </Group>
      </Paper>
    </>
  )
}