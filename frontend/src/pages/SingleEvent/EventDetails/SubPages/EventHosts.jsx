import React from 'react'
import {Box, Image, Heading, Text, Flex} from '@chakra-ui/react'
import host from '../../../../components/assets/host.svg'

const EventHosts = ({newEvent}) => {
  return (
    <Box>
        <Heading fontWeight={500} fontSize='24px' mb='4'>Event Host</Heading>
        <Flex alignItems='center' gap={3} mb='3'>
            <Image src={host} />
            <Text>{newEvent.host}</Text>
        </Flex>
        {/* <Flex alignItems='center' gap={3} mb='3'>
            <Image src={host} />
            <Text>Khadijah Abdulkareem</Text>
        </Flex> */}
    </Box>
  )
}

export default EventHosts