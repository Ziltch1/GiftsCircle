import React from 'react'
import {Box, Flex, Text, Heading, Button} from '@chakra-ui/react'
import {FiMoreHorizontal} from 'react-icons/fi'


const NotificationHeader = ({navPosition, setNavPosition}) => {
  const links = ['All', 'Unread'];

  const handleClick = (index) => {
    setNavPosition(index)
  }

  return (
    <Box mb='3'>
        <Box>
            <Flex justifyContent={'space-between'} mb='3'>
                <Heading fontWeight={'semibold'} fontSize='20px'>Notifications</Heading>
                <FiMoreHorizontal style={{fontSize: '25px'}} />
            </Flex>
        </Box>

        <Box fontSize={14}>
          {links.map((link, index) => <Button onClick={() => handleClick(index)} bg='none' style={index === navPosition ? { backgroundColor: '#CCF2F0', color: '#009F94' } : {}} borderRadius='50px' _hover={{ bg: '#CCF2F0', color:'#009F94' }} fontSize={14} fontWeight='medium' mr='4'>{link}</Button>)}
        </Box>
    </Box>
  )
}

export default NotificationHeader