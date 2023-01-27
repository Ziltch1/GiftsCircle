import React from 'react'
import { Box, Text, Image, Flex, Button, VStack } from '@chakra-ui/react'
import logo from '../../../assets/gift_circle_logo.svg'
import { AddIcon } from '@chakra-ui/icons'

const Navbar_2 = () => {
    return (
        <Box p='3' boxShadow={'sm'}>
            <Flex w='90%' mx='auto' justifyContent='space-between' alignItems={'center'}>
                <Box>
                    <Image src={logo} />
                </Box>

                <Box>
                    <Button bg='none' color='#0C4C84'> <AddIcon mr='1.5' /> Create an event</Button>
                    <Button bg='none' _hover={{ bg: 'none' }}>Sign in</Button>
                    <Button bg={'#00BFB2'} color='white' px='20px' py='10px' w='120px' h='42px' boxShadow={'md'} _hover={{ bg: '#00BFB2'}}>Sign up</Button>
                </Box>
            </Flex>
        </Box>
    )
}

export default Navbar_2