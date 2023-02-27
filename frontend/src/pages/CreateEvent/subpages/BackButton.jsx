import { ArrowBackIcon } from '@chakra-ui/icons'
import { Box, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Box color='#00BFB2' fontSize={14}>
        <Flex alignItems='center' gap={3}  onClick={() => navigate("/dashboard")} cursor="pointer">
            <ArrowBackIcon />
            <Text>Back</Text>
        </Flex>
    </Box>
  )
}

export default BackButton