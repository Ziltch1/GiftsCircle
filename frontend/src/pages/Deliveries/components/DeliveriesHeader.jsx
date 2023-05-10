import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React from 'react'

const DeliveriesHeader = ({ navPosition, setNavPosition }) => {
    const links = ['Open Deliveries', 'Closed Deliveries'];
    const handleClick = (index) => {
        setNavPosition(index);
    }
  return (
      <Box>
          <Flex pt='8' justifyContent={'space-between'} alignItems='center' mb='8'>
              <Box>
                  <Heading size='lg'>Deliveries</Heading>
              </Box>
          </Flex>

          <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
              <Flex gap={8} fontSize='14px'>
                  {links.map((link, index) => <Button bg='none' _hover={{ bg: 'none' }} borderRadius={0} onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2' } : { bg: 'none', borderRadius: '0px', color: '#717171' }} >{link}</Button>)}
              </Flex>
          </Box>
      </Box>
  )
}

export default DeliveriesHeader