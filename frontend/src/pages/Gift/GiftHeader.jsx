import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const GiftHeader = () => {
 
  return (
      <Box>
          <Flex pt='8' justifyContent={'space-between'} alignItems='center' mb='8'>
              <Box>
                  <Heading size='lg'>Gifts</Heading>
              </Box>
          </Flex> 
      </Box>
  )
}

export default GiftHeader