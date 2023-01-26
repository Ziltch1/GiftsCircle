import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './Components/Navbar/Navbar'
import Hero from './Pages/Homepage'

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Hero />
      {/* <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Grid>
      </Box> */}
    </ChakraProvider>
  );
}

export default App;
