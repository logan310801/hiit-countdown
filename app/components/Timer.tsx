'use client'

import { Title, Text, Paper, Group, Button, Card, Grid, Slider } from '@mantine/core'

import { useTimer } from '../utils/useTimer'
import { useHIIT } from '../utils/useHIITContext'
import { useState, useEffect } from 'react'

import { Volume, VolumeX } from "lucide-react";


type TimerProps = {
    soundEnabled: boolean
    toggleSound: () => void
}

export const Timer = ({ soundEnabled, toggleSound } : TimerProps) => {
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
  const nextIndex = currentIndex + 1
  const totalExercises = exercises.length

  const nextExerciseObj = currentIndex < totalExercises - 1 ? exercises[nextIndex] : undefined

  const { remaining, formatTime, reset } = useTimer(
    current?.duration ?? 0,
    current && (current.mode === 'timed' || current.mode === 'rest') && isRunning,
    () => {
      if (current?.mode === 'timed' || current?.mode === 'rest' ) {
        handleNext()
      }
    },
    nextExerciseObj,
    current,
    soundEnabled
  )

  

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
    setIsWorkoutActive(false)
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
    setRounds(prev => (prev < 7 ? prev + 1 : 1))
  }

  return (
    <>
      <Paper withBorder shadow='lg' radius='xl' p='lg'>
        <Card  radius='xl' m='sm'>
            <Title ta='center' size={35}>
                Round {current?.round} / {rounds}
            </Title>
        </Card>
        

        <Card bg={current?.mode === 'reps' ? '' : 'gray' } radius='xl' onClick={() => { if (current?.mode !== 'timed' || isRunning) handleNext() }} m='sm'>
            <Title ta='center' size={75}>
                {current?.mode === 'complete'
                    ? 'Finish'
                    : current?.mode !== 'reps'
                    ? formatTime(remaining)
                    : remaining + ' reps'}
            </Title>
        </Card>
        
        <Card  radius='xl' m='sm'>
            <Grid pl='lg'>
                <Grid.Col span={6}>

                    <Text >
                    Current 
                    </Text>

                    <Text >
                    {current?.name ?? '-'}
                    </Text>

                </Grid.Col>
                <Grid.Col span={6}>

                    <Text opacity='50%'>
                    Next 
                    </Text>

                    <Text opacity='50%'>
                    {nextExerciseObj?.name ?? '-'}
                    </Text>

                </Grid.Col>
            </Grid>
        </Card>

        
        
      </Paper>
      <Paper radius='xl' withBorder shadow='lg'  p='sm'>

      <Group gap='md' wrap='nowrap' justify='center'>
          <Button 
          w={70}
            p={10}
            radius='xl'
            disabled={isWorkoutActive || isRunning || exercises.length === 0}
            color='green'
            onClick={handleStart}
          >
            Start
          </Button>
          <Button p={10}
           w={70}
            radius='xl'onClick={handleReset} color='blue' disabled={exercises.length === 0}>
            Reset
          </Button>
          <Button p={10}
           w={70}
            radius='xl' disabled={!isWorkoutActive} onClick={handleStop} color='red'>
            Stop
          </Button>
          <Button
           w={70}
            p={10}
            radius='xl'
            disabled={current?.mode === 'timed' || exercises.length === 0}
            onClick={handleNext}
            color='black'
          >
            Next
          </Button>
          </Group>
         
          </Paper>

      <Paper withBorder shadow='lg' radius='xl' p='lg'>
        

          
          
      
      <Text  mb='xs' ta='center' size='md' >Rest</Text>
          <Grid justify='center' >
            <Grid.Col span={6}>
                <Text  mb='xs' ta='center' size='xs' >Between rounds</Text>
                <Slider 
                    label={(value) => `${value} seconds`}
                    disabled={isWorkoutActive || isRunning}
                    value={roundRest}
                    onChange={setRoundRest}
                    min={15}
                    max={150}
                    step={15}
                />
                <Text mt='xs' ta='center' size='xs' >{}</Text>
            </Grid.Col>
            
            
            <Grid.Col span={6}>
                <Text mb='xs' ta='center' size='xs'>Between exercises</Text>
                <Slider 
                    label={(value) => `${value} seconds`}
                    disabled={isWorkoutActive || isRunning}
                    value={exerciseRest}
                    onChange={setExerciseRest}
                    min={10}
                    max={30}
                    step={5}
                />
                <Text mt='xs' ta='center' size='sm' >{}</Text>
            </Grid.Col>
            <Grid.Col span={12}>
                <Group justify='center'>
                    <Text>Rounds</Text>
                <Button
                    radius='xl'
                    onClick={handleRoundChange}
                    disabled={isWorkoutActive}
                    color='gray'
                >
                    {rounds}
                </Button>
                <Button radius='xl' onClick={toggleSound}>
                    {soundEnabled ? (
                        <Volume size={24}/>
                    ) : (
                        <VolumeX size={24}  />
                    )}
                </Button>
                </Group>
                
            </Grid.Col>
            
            
          </Grid>
          
        
      </Paper>
    </>
  )
}