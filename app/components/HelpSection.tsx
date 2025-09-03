import { Text, Stack, Space } from '@mantine/core'

export const HelpSection = () => {
    return (
        <>
        <Stack style={{ height: '82vh'}}>
            <Stack>
                <Text size='xl' ta='center'>Welcome to HIIT Timer!</Text>
                <Text ta='center'></Text>

     

                <Text>1. Add your exercises with name, duration/reps and decide if it is timed or for reps.</Text>
                <Text>2. Change the rest period inbetween exercises and rounds</Text>
                <Text>3. Choose the amount of rounds</Text>
                <Text>4. Start the timer, Timed exercises and rest periods are counted down, 'Reps' mode exercises await the next button to be pressed to advance
                (Tip: you can also tap the timer screen to advance)</Text>
                <Text>5. If you are having issues with sound, try toggling the enable sound button(sound in development)</Text>
            </Stack>
            
            


        </Stack>

        <Text ta='center' size='xs'>Technologies used</Text>
        <Text ta='center' size='xs'>Next.JS + React, Mantine UI, VSCode</Text>
        <Text ta='center' size='xs'>github logan310801@gmail.com</Text>
        <Text ta='center' size='xs'>This application is in beta </Text>
        </>

    )
}