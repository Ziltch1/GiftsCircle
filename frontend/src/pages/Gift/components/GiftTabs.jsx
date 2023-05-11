import { Box, Flex, Button } from '@chakra-ui/react'
import React from 'react'


const GiftTabs = ({ navPosition, setNavPosition }) => {
    const links = ['Purchased for you', 'Purchased by you'];
    const handleClick = (index) => {
        setNavPosition(index);
    }
  return (
      <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
          <Flex gap={6} fontSize={13.5}>
              {links.map((link, index) => <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} color='#717171' fontWeight='medium' onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2', color: 'black' } : { color: '#717171' }}>{link}</Button>)}
          </Flex>
      </Box>
  )
}

export default GiftTabs