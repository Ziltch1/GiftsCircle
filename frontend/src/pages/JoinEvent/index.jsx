import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../../components/Header/Header'
import Join from './subpages/Join'


const index = () => {
  return (
    <Box>
        <Header />
        <Box display='flex' alignItems='center' justifyContent='center' h='90vh'>
            <Join />
        </Box>
    </Box>
  )
}

export default index