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

          <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
              <Flex gap={6} fontSize={13.5}>
                  <Button borderBottom='2px solid #00BFB2' bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium'>Purchased for you</Button>
                  <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} color='#717171' fontWeight='medium'>Purchased by you</Button>
              </Flex>
          </Box>
      </Box>
  )
}

export default GiftHeader