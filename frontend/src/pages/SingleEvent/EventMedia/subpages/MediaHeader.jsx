import React, { useState } from 'react'
import { Box, Heading, Text, Flex, Button, FormLabel, Input } from '@chakra-ui/react'

const MediaHeader = ({ navPosition, setNavPosition }) => {
  const actionBtns = ['Uploaded by me', 'Sent to me']
  const handleClick = (index) => {
    setNavPosition(index);
  }

  return (
    <Box mb='5'>
        <Flex justifyContent='space-between'>
              <Heading mb='5' fontWeight={'medium'} fontSize={24}>Media</Heading>
              <FormLabel htmlFor='upload' w='200px' color='white' bg='#00BFB2' fontSize={14} borderRadius='5px' px='28px' py='11px' textAlign='center'>
                Upload images/videos
                <Input type='file' id='upload' display='none' />
              </FormLabel>
        </Flex>
        <Box fontSize={14} fontWeight='semibold'>
            <Flex alignItems={'center'} gap={4}>
                  {actionBtns.map((btn, index) => <Button borderRadius={100} fontSize={14} bg='none' onClick={() => handleClick(index)} 
                      style={index === navPosition ? { background: '#CCF2F0', padding: '8px 15px', borderRadius: '100px', color: '#009F94' } : {fontWeight: 'bold'}}>{btn}</Button>)}
            </Flex>  
        </Box>

    </Box>
  )
}

export default MediaHeader