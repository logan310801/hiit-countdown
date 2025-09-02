import { Card, Button, Text, Group, Stack } from '@mantine/core'
import { useHIIT, Exercise } from '../utils/useHIITContext'
import { Trash } from 'lucide-react'

export const ExerciseList = () => {
    const { exercises, deleteExercise, clearExercises } = useHIIT()

    return (
        <Stack justify='space-between'>
        <Stack >

                <Text size='xl' ta='center' >Exercises</Text>

            <Card >
            {exercises.map((exercise) => 
                    <Card mb='sm' p='sm' bg='gray' key={exercise.id}>
                        <Group wrap='nowrap' justify='space-between'>
                            <Group>
                                <Text truncate ml='sm'>{exercise.name}</Text>
                                <Text>{exercise.duration} {exercise.mode === 'reps' ? 'Reps' : 'Secs'}</Text>
    
                            </Group>
                            
                            <Button color='red' variant='subtle' onClick={() => deleteExercise(exercise.id)}><Trash size={13} /></Button>
                        </Group>
                    </Card>
            )}
            </Card>
        </Stack>
        <Button onClick={clearExercises} color='red' variant='subtle'>Clear Exercises</Button>
       </Stack>
    )
}