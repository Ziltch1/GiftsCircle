import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const DeliveryDetailsFooter = () => {
  return (
    <>
      <Box p='3' textAlign='right'>
        <Button mr='4'>Cancel</Button>
        <Button bg='#00BFB2' color='white' fontSize={15} fontWeight='medium'>Save</Button>
      </Box>
      {/* <Box p='3' textAlign='right'>
        <Button mr='4'>Cancel</Button>
        <Button bg='#00BFB2' color='white' fontSize={15} fontWeight='medium'>Select Address</Button>
      </Box> */}
    </>
  )
}

export default DeliveryDetailsFooter