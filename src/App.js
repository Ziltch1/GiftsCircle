import React from 'react';
import { ChakraProvider, Box, Grid, theme } from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Navbar from './Components/Navbar/Navbar'
import Hero from './Pages/Homepage'
import Navbar_2 from './Components/Navbar_2/Navbar_2';


function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar_2 />
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
