import React from 'react'
import { Box, Heading, Flex, Button, FormLabel, Input } from '@chakra-ui/react'

const MarketplaceHeader = ({navPosition, setNavPosition}) => {
  const actionBtns = ['Asoebi', 'Gifts', 'Sourvenirs']
  const handleClick = (index) => {
    setNavPosition(index);
  }
  return (
      <Box mb='5'>
          <Box>
              <Heading mb='5' fontWeight={'medium'} fontSize={24}>Marketplace</Heading>
          </Box>
          <Box fontSize={14} fontWeight='semibold'>
              <Flex alignItems={'center'} gap={4}>
                  {actionBtns.map((btn, index) => <Button borderRadius={100} fontSize={14} bg='none' fontWeight='medium' onClick={() => handleClick(index)}
                      style={index === navPosition ? { background: '#CCF2F0', padding: '8px 15px', borderRadius: '100px', color: '#009F94', fontWeight: 'bold' } : null}>{btn}</Button>)}
              </Flex>
          </Box>

      </Box>
  )
}

export default MarketplaceHeader