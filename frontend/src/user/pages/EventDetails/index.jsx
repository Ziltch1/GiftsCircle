import React from 'react'
import Header from '../../components/Header/Header'
import {Box} from '@chakra-ui/react'
import EventDetails from './pages/EventDetails'

const index = () => {
  return (
    <Box>
        <Header />
        <EventDetails />
    </Box>
  )
}

export default index