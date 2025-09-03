import { useEffect, useState } from "react"
import { Group, Button, TextInput, Switch, Text, Stack, NumberInput } from '@mantine/core'
import { useHIIT, Exercise } from "../utils/useHIITContext"
import { v4 as uuidv4 } from 'uuid'

export const CRUDButtons = () => {
    const [name, setLabel] = useState<string>('')
    const [timed, setTimed] = useState<boolean>(true)
    const [duration, setDuration] = useState<number>(30)

    const { addExercise } = useHIIT()

    useEffect(() => {
        if (timed) setDuration(30) 
            else setDuration(10)
    }, [timed])

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
        setDuration(30)
    }

    const handleIncreaseDuration = () => {
        if (timed && duration < 240 ) { 
            setDuration(i => i + 5)
        } else if (duration < 75) {
            setDuration(i => i + 1)
        }
    }

    const handleDecreaseDuration = () => {
        if (timed && duration > 15 ) { 
            setDuration(i => i - 5)
        } else if (duration > 1) {
            setDuration(i => i - 1)
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <Stack>
                
                    <TextInput 
                        radius='xl' 
                        placeholder="Exercise name"
                        value={name}
                        onChange={(e) => setLabel(e.currentTarget.value)}
                        maxLength={13}
                    />
                    <Group justify="center">
                        <Button radius='xl' onClick={handleDecreaseDuration}>
                            -
                        </Button>

                        <Text>
                            {duration} {timed ? 'seconds' : 'reps'}
                        </Text>

                        <Button radius='xl' onClick={handleIncreaseDuration}>
                            +
                        </Button>
                    </Group>
                
                    
                <Group justify="center">
                    <Group>
                        <Text size='xl'>Reps</Text>
                        <Switch 
                            checked={timed}
                            onChange={(e) => setTimed(e.currentTarget.checked)}
                            size='lg'
                            color='green'

                        />
                        <Text size='xl'>Timed</Text>
                    </Group>
                   
                </Group>
                <Button radius='xl' type='submit'>Add Exercise</Button>
            </Stack>
        </form>
        </>
    )
}