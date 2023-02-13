import React, {useState} from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
// import { NavLink } from 'react-router-dom'

const Tabs = () => {

    const [navPosition, setNavPosition] = useState(0);
    const [active, setActive] = useState(false);
    const links = ['About events', 'Gift', 'Media', 'Guests'];

    const handleClick = (index) => {
        setNavPosition(index);
    }

    return (
        <Box>
            <Box borderBottom='1.5px solid lightgrey' w='100%' mb='7'>
                <Flex gap={8} fontSize='14px'>
                    {/* <NavLink><Button borderBottom='2px solid #00BFB2' bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontSize={14}>About events</Button></NavLink>
                    <NavLink><Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Gift</Button></NavLink>
                    <NavLink><Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Media</Button></NavLink>
                    <NavLink><Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Guests (0) </Button></NavLink> */}
                    {links.map((link, index) => <Button onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2' } : null} bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>{link}</Button>)}
                </Flex>
            </Box>
        </Box>
    )
}

export default Tabs