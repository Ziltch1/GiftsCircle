import React, {useState} from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'

const Tabs = ({navPosition, setNavPosition}) => {

    const links = ['About events', 'Gift', 'Media', 'Guests'];
    const handleClick = (index) => {
        setNavPosition(index);
    }

    return (
        <Box>
            <Box borderBottom='1.5px solid lightgrey' w='100%' mb='7'>
                <Flex gap={8} fontSize='14px'>
                    {links.map((link, index) => <Button onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2', fontWeight: 'bold' } : { color: '#717171'}} bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>{link}</Button>)}
                </Flex>
            </Box>
        </Box>
    )
}

export default Tabs