import { Box, Heading } from '@chakra-ui/react'
import React from 'react'

const DeliveryDetailsHeader = () => {
  return (
    <Box p='3' textAlign='center'>
      <Heading fontSize={23}>Delivery Address</Heading>
    </Box>
  )
}

export default DeliveryDetailsHeader