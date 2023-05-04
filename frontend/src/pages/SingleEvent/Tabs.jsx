import React from 'react'
import { Box, Flex, Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux';


const Tabs = ({navPosition, setNavPosition}) => {

    const { fundRaising } = useSelector(state => state.event);
    const links = ['About event', 'Gift', 'Media', 'Guests'];
    const handleClick = (index) => {
        setNavPosition(index);
    }

    if (fundRaising) {
        links.push('Fundraising');
    }


    return (
        <Box>
            <Box borderBottom='1.5px solid lightgrey' w='100%' mb='7'>
                <Flex gap={8} fontSize='14px'>
                    {links.map((link, index) => <Button key={index} onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2', fontWeight: 'bold' } : { color: '#717171'}} bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>{link}</Button>)}
                </Flex>
            </Box>
        </Box>
    )
}

export default Tabs