import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import React from 'react'

const BackButton = ({action}) => {
  return (
    <Box color='#00BFB2' fontSize={14} w='150px'>
        <Flex alignItems='center' gap={3}  onClick={action} cursor="pointer">
            <Button bg='none' borderRadius='50%' w='40px' h='40px'><ArrowBackIcon fontSize={22} /></Button>
            <Text>Back</Text>
        </Flex>
    </Box>
  )
}

export default BackButton