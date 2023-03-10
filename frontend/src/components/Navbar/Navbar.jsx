import React from 'react'
import {Box, UnorderedList, ListItem, HStack} from '@chakra-ui/react'

const Navbar = ({navPosition, setNavPosition}) => {
  const tabs = ['Events', 'Gifts', 'Marketplace', 'Deliveries', 'Settings']
  const handleClick = (index) => {
    setNavPosition(index);
  }
  return (
    <Box boxShadow={'md'} bg='white' w='100%' h='60px' pt='7'>
        <Box w='90%' mx='auto'>
            <UnorderedList listStyleType={'none'} fontWeight='medium' fontSize='15px'>
                <HStack spacing={7} display='flex' alignItems='start'>
                    {tabs.map((tab, index) => <ListItem key={index} cursor='pointer' w='115px' textAlign='center' pb='6px' onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '3px solid #00BFB2', paddingBottom: '7px', color: '#00BFB2' } : { color: '#717171' }}>{tab}</ListItem>)}
                </HStack>
            </UnorderedList>
        </Box>
    </Box>
  )
}

export default Navbar