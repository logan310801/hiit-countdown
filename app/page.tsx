'use client'

import { Grid, Center, Stack, Paper, Group } from '@mantine/core'
import { Timer } from './components/Timer';
import { CRUDButtons } from './components/CRUDButtons'
import { ExerciseList } from './components/ExerciseList'
import { longBeep, shortBeep } from './utils/speak';

import { useState } from 'react'


export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false)

  const toggleSound = () => {
      if (!soundEnabled) {
        shortBeep() 
      }
      setSoundEnabled(prev => !prev);
      };

  return (
    <>
    <Center p={{ base: 'sm', md: 'xl' }} >
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack >
                <Timer soundEnabled={soundEnabled} toggleSound={toggleSound} />
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
