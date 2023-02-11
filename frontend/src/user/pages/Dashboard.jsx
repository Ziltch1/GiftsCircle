import React from 'react'
import {Box} from '@chakra-ui/react'
import Header from '../components/Header/Header'
import Events from './Events'

const Dashboard = () => {
  return (
    <Box>
        <Header />
        <Events />
    </Box>
  )
}

export default Dashboard