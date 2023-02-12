import React from 'react'
import { Box, Flex, Button, Heading } from '@chakra-ui/react'

const Tabs = () => {
    return (
        <Box>
            <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
                <Flex gap={8} fontSize='14px'>
                    <Button borderBottom='2px solid #00BFB2' bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontSize={14}>About events</Button>
                    <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Gift</Button>
                    <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Media</Button>
                    <Button bg='none' borderRadius={0} _hover={{ bg: 'none' }} fontWeight='medium' fontSize={14}>Guests (0) </Button>
                </Flex>
            </Box>
        </Box>
    )
}

export default Tabs