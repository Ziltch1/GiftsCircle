import React from 'react'
import {Box, Flex, Text, Heading, Button} from '@chakra-ui/react'
import {FiMoreHorizontal} from 'react-icons/fi'


const Notification = () => {
  return (
    <Box w='393px' h='520px' bg='white' boxShadow='lg' borderRadius='10px' p='5' position='absolute' right='70px' top='70px' zIndex='overlay'>
        <Box>
            <Flex justifyContent={'space-between'}>
                <Heading fontWeight={'semibold'} fontSize='20px'>Notifications</Heading>
                <FiMoreHorizontal style={{fontSize: '25px'}} />
            </Flex>
        </Box>

        <Box fontSize={14}>
            <Button>All</Button>
            <Button>Unread</Button>
        </Box>
    </Box>
  )
}

export default Notification