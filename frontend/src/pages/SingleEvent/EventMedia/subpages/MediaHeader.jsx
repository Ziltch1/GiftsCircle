import React, { useState } from 'react'
import { Box, Heading, Text, Flex, Button } from '@chakra-ui/react'

const MediaHeader = ({ navPosition, setNavPosition }) => {
  const actionBtns = ['Uploaded by me', 'Sent to me'];
  const handleClick = (index) => {
    setNavPosition(index);
  }

  return (
    <Box mb='5'>
        <Heading mb='5' fontWeight={'medium'} fontSize={24}>Media</Heading>
        <Box fontSize={14} fontWeight='semibold'>
            <Flex alignItems={'center'} gap={4}>
                  {actionBtns.map((btn, index) => <Button borderRadius={100} fontSize={14} bg='none' onClick={() => handleClick(index)} 
                  style={index === navPosition ? { background: '#CCF2F0', padding: '8px 15px', borderRadius: '100px' } : {fontWeight: 'normal'}}>{btn}</Button>)}
            </Flex>  
        </Box>

    </Box>
  )
}

export default MediaHeader