import { Box, Flex, Button, Heading } from '@chakra-ui/react'
import React from 'react'

const SettingsHeader = ({ navPosition, setNavPosition }) => {
    const links = ['My Profile', 'Security settings'];
    const handleClick = (index) => {
        setNavPosition(index);
    }
  return (
      <Box>
          <Flex pt='8' justifyContent={'space-between'} alignItems='center' mb='8'>
              <Box>
                  <Heading size='lg'>Settings</Heading>
              </Box>
              {/* <Flex gap='4'>
                  <Button bg='rgba(204, 242, 240, 0.5)' color='#009F94' fontWeight={'medium'} fontSize='14px'>Join an event</Button>
                  <Button bg='#00BFB2' color='white' fontWeight={'medium'} fontSize='14px'>Create an event</Button>
              </Flex> */}
          </Flex>

          <Box borderBottom='1.5px solid lightgrey' w='100%' mb='5'>
              <Flex gap={8} fontSize='14px'>
                  {links.map((link, index) => <Button bg='none' _hover={{ bg: 'none' }} borderRadius={0} onClick={() => handleClick(index)} style={index === navPosition ? { borderBottom: '2px solid #00BFB2' } : { bg: 'none', borderRadius: '0px', color: '#717171' }} >{link}</Button>)}
              </Flex>
          </Box>
      </Box>
  )
}

export default SettingsHeader