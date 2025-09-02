import { Card, Button, Text, Group, Stack } from '@mantine/core'
import { useHIIT, Exercise } from '../utils/useHIITContext'
import { Trash } from 'lucide-react'

export const ExerciseList = () => {
    const { exercises, deleteExercise, clearExercises } = useHIIT()

    return (
        <Stack justify='space-between'>
        <Stack w={275} mih={475}>

                <Text size='xl' ta='center' >Exercises</Text>

            <Card mih='400px' style={{ height: '100%' }}>
            {exercises.map((exercise) => 
                    <Card p='sm' bg='gray' key={exercise.id}>
                        <Group justify='space-between'>
                            <Group>
                                <Text ml='sm'>{exercise.name}</Text>
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