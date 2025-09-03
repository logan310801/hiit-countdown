import { Card, Button, Text, Group, Stack } from '@mantine/core'
import { useHIIT, Exercise } from '../utils/useHIITContext'
import { Trash } from 'lucide-react'

export const ExerciseList = () => {
    const { exercises, deleteExercise, clearExercises, currentIndex } = useHIIT()

    return (

    <Stack gap="sm" justify="space-between">
    <Text size="xl" ta="center">Exercises</Text>

  <Stack gap="xs">
    {exercises.map((exercise, idx) => (

      <Card
      radius='xl' 
      key={`${exercise.id}-${exercise.round}-${idx}`}
      bg={
        exercise.mode === 'rest' ? exercise.isRoundRest ? 'black' : 'gray' : 'blue'
      }
      pt={exercise.mode === 'rest' ? 5 : 10}
      pb={exercise.mode === 'rest' ? 5 : 10}
      opacity={exercise.mode === 'rest' && !exercise.isRoundRest ? '50%' : 100}
      bd={exercise.id === exercises[currentIndex].id && exercise.round === exercises[currentIndex]?.round ? '3px solid yellow' : undefined}
 
    >
        <Group
            justify={exercise.isRoundRest ? "center" : "space-between"}
            align="center"
            wrap="nowrap"
            >
            <Group gap="sm" align="center" wrap="nowrap">
                <Text
                size={exercise.mode === "rest" ? "xs" : undefined}
                truncate
                >
                {exercise.isRoundRest
                    ? `Round ${exercise.round ? exercise.round + 1 : ""}`
                    : exercise.name}
                </Text>
                <Text
                size={exercise.mode === "rest" ? "xs" : undefined}
                >
                {exercise.mode === "complete"
                    ? ""
                    : exercise.mode === "timed" || exercise.mode === "rest"
                    ? `${exercise.duration} Secs`
                    : `${exercise.duration} Reps`}
                </Text>
            </Group>

            {(exercise.mode === 'timed' || exercise.mode === 'reps') && !exercise.isRoundRest && (
                <Button
                    radius='xl' 
                    color="red"
                    variant="subtle"
                    size="xs"
                    onClick={() => exercise.id && deleteExercise(exercise.id)}
                >
                    <Trash size={13} />
                </Button>
                )}
            </Group>
      </Card>
    ))}
  </Stack>
  

  <Button radius='xl' disabled={exercises.length === 0} onClick={clearExercises} color="red" variant="subtle">
    Clear Exercises
  </Button>
</Stack>
    )
}