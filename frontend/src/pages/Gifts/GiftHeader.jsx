import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const GiftHeader = ({navPosition, setNavPosition}) => {
  const links = ['Purchased for you', 'Purchased by you'];
  const handleClick = (index) => {
    setNavPosition(index);
  }
  return (
      <Box>
          <Flex pt='8' justifyContent={'space-between'} alignItems='center' mb='8'>
              <Box>
                  <Heading size='lg'>Gifts</Heading>
              </Box>
          </Flex>

          <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
              <Flex gap={6} fontSize={13.5}>
                  {links.map((link, index) => <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} color='#717171' fontWeight='medium' onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2', color: 'black'} : { color: '#717171' }}>{link}</Button>)}
              </Flex>
          </Box>
      </Box>
  )
}

export default GiftHeader