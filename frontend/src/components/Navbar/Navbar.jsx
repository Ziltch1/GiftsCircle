import React from 'react'
import {Box, UnorderedList, ListItem, HStack} from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Box boxShadow={'md'} bg='white' w='100%' h='60px' pt='7'>
        <Box w='90%' mx='auto'>
            <UnorderedList listStyleType={'none'} fontWeight='medium' fontSize='15px'>
                <HStack spacing={7} display='flex' alignItems='start'>
                    <ListItem w='80px' textAlign='center' borderBottom='3px solid #00BFB2' pb='7px' color='#00BFB2'>Events</ListItem>
                    <ListItem w='80px' textAlign='center' pb='6px'>Gifts</ListItem>
                    <ListItem w='115px' textAlign='center' pb='6px'>Marketplace</ListItem>
                    <ListItem w='110px' textAlign='center' pb='6px'>Deliveries</ListItem>
                    <ListItem w='90px' textAlign='center' pb='6px'>Settings</ListItem>
                </HStack>
               
            </UnorderedList>
        </Box>
    </Box>
  )
}

export default Navbar