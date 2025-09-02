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
    <Center p={{ base: 'sm', md: 'xl' }} >
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack >
              <Timer />
            <Paper withBorder shadow='lg' radius='md' p='lg'>
              <CRUDButtons />
            </Paper>
            
          </Stack>
          </Grid.Col>
        
        
          <Grid.Col span={{ base: 12, md: 6 }}>
          <Paper withBorder shadow='lg' radius='md' p='lg'>
            <ExerciseList />
          </Paper>
          </Grid.Col>
        </Grid>
   
 
    </Center>
    </>
  );
}
