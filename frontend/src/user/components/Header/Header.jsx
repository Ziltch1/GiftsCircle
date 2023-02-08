import React from 'react'
import {Box, Image, Avatar, AvatarBadge, Flex} from '@chakra-ui/react'
import logo from '../assets/Logo.png'
import notification from '../assets/notification.svg'

const Header = () => {
  return (
    <Box bg='#CEDBE6' p='3' w='100%'>
        <Box w='90%' mx='auto'>
          <Flex justifyContent={'space-between'}>
            <Box><Image src={logo} w='60%' /></Box>
            <Box>
               <Flex gap={4}>
                 <Image src={notification} />
                 <Avatar size='sm' name='Ayanwumi Abdulroheem' bg='#0C4C84' />
               </Flex>
            </Box>
          </Flex>
        </Box>
    </Box>
  )
}

export default Header