import React from 'react'
import {Box, Heading, Text, Flex} from '@chakra-ui/react'

const GiftHeader = () => {
  return (
    <Box mb='5'>
        <Heading mb='5' fontWeight={'medium'} fontSize={24}>Gift</Heading>
        <Box fontSize={14} fontWeight='semibold'>
            <Flex alignItems={'center'} gap={4}>
                <Text bg='#CCF2F0' color='#009F94' px='10px' py='5px' borderRadius={100} w='166px'>Purchase history (30)</Text>
                 <Text>Gift list</Text>
            </Flex>  
        </Box>
    </Box>
  )
}

export default GiftHeader