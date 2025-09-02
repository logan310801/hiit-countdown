'use client'

import { Title, Text, Paper, Group, Button, Card, Grid, Slider } from '@mantine/core'
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
    roundRest,
    setRoundRest,
    exerciseRest,
    setExerciseRest

    
  } = useHIIT()
  const current = exercises[currentIndex]

  const { remaining, formatTime, reset } = useTimer(
    current?.duration ?? 0,
    current && (current.mode === 'timed' || current.mode === 'rest') && isRunning,
    () => {
      if (current?.mode === 'timed' || current?.mode === 'rest' ) {
        handleNext()
      }
    }
  )

  const nextIndex = currentIndex + 1
  const totalExercises = exercises.length

  const nextExerciseObj = currentIndex < totalExercises - 1 ? exercises[nextIndex] : undefined

  // Stop timer when last exercise is reached
  useEffect(() => {
    if (currentIndex >= totalExercises - 1) {
      setIsRunning(false)
      setIsWorkoutActive(false)
      // optionally, you could set a workoutComplete flag here
    }
  }, [currentIndex, totalExercises])

  // Ensure first exercise of each round handles UI correctly
  useEffect(() => {
    if (!current) return
    if (current?.mode === 'reps') {
      setIsRunning(false)
    }
  }, [current])

  const handleStart = () => {
    setIsWorkoutActive(true)
    if (current?.mode !== 'reps') setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    resetWorkout()
    reset()
    setIsRunning(false)
    setIsWorkoutActive(false)
  }

  const handleNext = () => {
    nextExercise() // updates currentIndex in context
    reset()        // reset timer for the new current

    // Only start timer automatically if the next exercise is timed
    setIsRunning(nextExerciseObj?.mode === 'timed' || (nextExerciseObj?.mode === 'rest' && isWorkoutActive))
  }

  const handleRoundChange = () => {
    setRounds(prev => (prev < 5 ? prev + 1 : 1))
  }

  return (
    <>
      <Paper withBorder shadow='lg' radius='md' p='lg'>

        <Title ta='center' size={35}>
            Round {current?.round} / {rounds}
        </Title>

        <Card m='sm'>
            <Title ta='center' size={75}>
                {current?.mode === 'complete'
                    ? 'Finish'
                    : current?.mode !== 'reps'
                    ? formatTime(remaining)
                    : remaining}
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
          </Group>

          <Group mt='sm' justify='center'>
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

          <Grid justify='center' mt='md'>
            <Grid.Col span={6}>
                <Text  mb='xs' ta='center' size='sm' >Rest between rounds</Text>
                <Slider 
                    label={(value) => `${value} seconds`}
                    disabled={isWorkoutActive || isRunning}
                    value={roundRest}
                    onChange={setRoundRest}
                    min={15}
                    max={150}
                    step={15}
                />
                <Text mt='xs' ta='center' size='sm' >{}</Text>
            </Grid.Col>
            
            
            <Grid.Col span={6}>
                <Text mb='xs' ta='center' size='sm'>Rest between exercises</Text>
                <Slider 
                    label={(value) => `${value} seconds`}
                    disabled={isWorkoutActive || isRunning}
                    value={exerciseRest}
                    onChange={setExerciseRest}
                    min={5}
                    max={30}
                    step={5}
                />
                <Text mt='xs' ta='center' size='sm' >{}</Text>
            </Grid.Col>
            
            
          </Grid>
        
      </Paper>
    </>
  )
}