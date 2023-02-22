import { CloseIcon } from '@chakra-ui/icons'
import { Box, Heading, Text, Flex } from '@chakra-ui/react'
import React from 'react'

const FormHeader = () => {
  return (
    <Box w='80%' mx='auto' mb='3'>
        <Flex justifyContent='space-between' alignItems='center'>
            <Box>
                <Flex alignItems='center' gap={6}>
                    <CloseIcon fontSize={10} />
                    <Heading fontWeight='medium' fontSize='20px'>Create Event</Heading>
                </Flex>
            </Box>

            <Box fontSize={14}>
                Step 1/6 - Basic Info
            </Box>
        </Flex>
    </Box>
  )
}

export default FormHeader