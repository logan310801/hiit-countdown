import { useState } from "react"
import { Group, Button, TextInput, Switch, Text, Stack, NumberInput } from '@mantine/core'
import { useHIIT, Exercise } from "../utils/useHIITContext"
import { v4 as uuidv4 } from 'uuid'

export const CRUDButtons = () => {
    const [name, setLabel] = useState<string>('')
    const [timed, setTimed] = useState<boolean>(false)
    const [duration, setDuration] = useState<string | number>('')

    const { addExercise } = useHIIT()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newExercise: Exercise = {
            id: uuidv4(),
            name: name[0].toUpperCase() + name.slice(1),
            mode: timed ? 'timed' : 'reps',
            duration: Number(duration)
        }

        addExercise(newExercise)
        setLabel('')
        setDuration('')
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <Stack>
                <Group>
                    <TextInput 
                        placeholder="Exercise name"
                        value={name}
                        onChange={(e) => setLabel(e.currentTarget.value)}
                    />

                    <NumberInput 
                        placeholder="Exercise duration / reps"
                        value={duration}
                        onChange={setDuration}
                        step={timed ? 10 : 2 }
                        min={0}
                        max={320}
                    />

                    <Button type='submit'>Add Exercise</Button>
                </Group>
                    
                <Group justify="center">
                    <Group>
                        <Text size='xl'>Reps</Text>
                        <Switch 
                            checked={timed}
                            onChange={(e) => setTimed(e.currentTarget.checked)}
                            size='lg'
                            color='orange'

                        />
                        <Text size='xl'>Timed</Text>
                    </Group>
                   
                </Group>
            </Stack>
        </form>
        </>
    )
}