import React from 'react'
import {Box, Image, Heading, Text, Flex} from '@chakra-ui/react'
import host from '../../../components/assets/host.svg'

const EventHosts = () => {
  return (
    <Box>
        <Heading fontWeight={500} fontSize='24px' mb='4'>Events Host</Heading>
        <Flex alignItems='center' gap={3} mb='3'>
            <Image src={host} />
            <Text>Khadijah Abdulkareem</Text>
        </Flex>
        <Flex alignItems='center' gap={3} mb='3'>
            <Image src={host} />
            <Text>Khadijah Abdulkareem</Text>
        </Flex>
    </Box>
  )
}

export default EventHosts