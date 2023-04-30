import { Box } from '@chakra-ui/react'
import React from 'react'
import FundraisingCard from './FundraisingCard'
import DonationHistory from './DonationHistory'

const index = ({event}) => {
  return (
    <Box>
        <FundraisingCard event={event} />
        <DonationHistory />
    </Box>
  )
}

export default index