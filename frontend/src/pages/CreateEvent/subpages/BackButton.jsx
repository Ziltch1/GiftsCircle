import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'

const BackButton = ({action}) => {
  return (
    <Box color='#00BFB2' fontSize={14}>
        <Flex alignItems='center' gap={3}  onClick={action} cursor="pointer">
            <ArrowBackIcon />
            <Text>Back</Text>
        </Flex>
    </Box>
  )
}

export default BackButton