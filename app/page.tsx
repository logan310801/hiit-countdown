'use client'

import { Grid, Center, Stack, Paper, Button, Drawer } from '@mantine/core'
import { Timer } from './components/Timer';
import { CRUDButtons } from './components/CRUDButtons'
import { ExerciseList } from './components/ExerciseList'
import { shortBeep, speak } from './utils/speak';

import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks';
import { HelpCircle } from 'lucide-react';
import { HelpSection } from './components/HelpSection';


export default function Home() {
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [opened, {open, close}] = useDisclosure(false)

  const toggleSound = () => {
      if (!soundEnabled) {
        shortBeep() 
        speak('Sound enabled')
      }
      setSoundEnabled(prev => !prev);
      };

  return (
    <>
         <Button
        onClick={open}
        variant="filled"
        color="white"
        radius="xl"
        size="lg"
        style={{
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          zIndex: 1000,
          borderRadius: "50%",
          width: "3rem",
          height: "3rem",
          padding: 0,
        }}
      >
        <HelpCircle color='black' size={20} />
      </Button>

      <Drawer opened={opened} onClose={close} >
        <HelpSection />
      </Drawer>

    <Center p={{ base: 'sm', md: 'xl' }} >
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack >
                <Timer soundEnabled={soundEnabled} toggleSound={toggleSound} />
              <Paper withBorder shadow='lg' radius='xl' p='lg'>
                <CRUDButtons />
              </Paper>
            </Stack>
          </Grid.Col>
        
        
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper withBorder shadow='lg' radius='xl' p='lg'>
              <ExerciseList />
            </Paper>
          </Grid.Col>
        </Grid>
   
 
    </Center>
    </>
  );
}
