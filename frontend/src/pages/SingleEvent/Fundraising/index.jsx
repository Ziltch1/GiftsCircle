import React from 'react'
import FundraisingCard from './subpages/FundraisingCard'
import DonationHistory from './subpages/DonationHistory'
import { Box } from '@chakra-ui/react'

const index = () => {
  return (
    <Box>
        <FundraisingCard />
        <DonationHistory />
    </Box>
  )
}

export default index