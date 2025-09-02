import { Card, Button, Text, Group, Stack } from '@mantine/core'
import { useHIIT, Exercise } from '../utils/useHIITContext'
import { Trash } from 'lucide-react'

export const ExerciseList = () => {
    const { exercises, deleteExercise, clearExercises } = useHIIT()

    return (
        <Stack gap="sm" justify="space-between">
  <Text size="xl" ta="center">Exercises</Text>

  <Stack gap="xs">
    {exercises.map((exercise) => (
      <Card
      key={exercise.id}
      bg={
        exercise.mode === 'rest'
          ? 'gray' // rest exercises get a different background
          : exercise?.round && exercise.round % 2
          ? 'blue.6'
          : 'teal'
      }
      p='xs'
      h={exercise.mode === 'rest' ? 50 : undefined} 
    >
        <Group justify="space-between" align="center" wrap='nowrap'>
          <Group gap="sm" align="center" wrap='nowrap'>
            <Text size={exercise.mode === 'rest' ? 'xs' : undefined} truncate>{exercise.name}</Text>
            <Text size={exercise.mode === 'rest' ? 'xs' : undefined} >{exercise.duration} {exercise.mode === 'reps' ? 'Reps' : 'Secs'}</Text>
            <Text size={exercise.mode === 'rest' ? 'xs' : undefined} >Round {exercise?.round}</Text>
          </Group>

          <Button
            color="red"
            variant="subtle"
            size="xs"
            onClick={() => exercise.id && deleteExercise(exercise.id)}
          >
            <Trash size={13} />
          </Button>
        </Group>
      </Card>
    ))}
  </Stack>

  <Button onClick={clearExercises} color="red" variant="subtle">
    Clear Exercises
  </Button>
</Stack>
    )
}