import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react'
import React from 'react'
import Search from '../../../../components/Search/Search'
import cartIcon from '../../../assets/cart.svg'

const Market = () => {
  return (
    <Box bg='#F5F5F5'>
        <Box minH='600px' w='90%' mx='auto' pt='8'>
            <Box mb='8'>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Heading fontWeight='semibold' fontSize={30} mb='2'>Marketplace</Heading>
                        <Text fontSize={14}>This is where you can buy some things you need for your event for your self</Text>
                    </Box>

                    <Box bg='#CCF2F0' w='155px' h='50px' py='4' px='6' cursor='pointer' borderRadius={5}>
                    <Flex gap={2} fontSize={14}>
                        <Image src={cartIcon} />
                        <Text>Cart</Text>
                        <Text bg='#00BFB2' color='white' w='33px' h='21px' borderRadius='100px' textAlign='center' pb='4px' px='3px'>34</Text>
                    </Flex>
                    </Box>
                </Flex>
            </Box>
            <Search />
        </Box>
    </Box>
  )
}

export default Market