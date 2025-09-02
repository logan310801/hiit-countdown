'use client'

import { Grid, Center, Stack, Paper, Group } from '@mantine/core'
import { useTimer } from './utils/useTimer'
import { useHIIT } from './utils/useHIITContext';

import { Timer } from './components/Timer';
import { CRUDButtons } from './components/CRUDButtons'
import { ExerciseList } from './components/ExerciseList'


export default function Home() {
  

  return (
    <>
    <Center style={{ height: '100vh' }}>
      
        <Group>
          <Stack >
              <Timer />
            <Paper withBorder shadow='lg' radius='md' p='lg'>
              <CRUDButtons />
            </Paper>
          </Stack>
        
        
        
          <Paper miw={300} withBorder shadow='lg' radius='md' p='lg'>
            <ExerciseList />
          </Paper>
        </Group>
   
 
    </Center>
    </>
  );
}
