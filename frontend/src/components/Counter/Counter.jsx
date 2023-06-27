import React from 'react'
import {Box, Button, Text, Stack} from '@chakra-ui/react'
import {AddIcon, MinusIcon} from '@chakra-ui/icons'

const Counter = ({quantity, setQuantity, id, handleIncrement, handleDecrement}) => {
  
  return (
    <Box color='white' bg='#00BFB2' p='3' borderRadius={5} w='150px' h='47px' display='flex' alignItems='center' justifyContent='center'>
       <Stack direction='row' alignItems='center' justifyContent='space-between' spacing='5'>
              <Button bg='none' p='0' _hover={{bg: 'none'}} id={id} onClick={() => handleDecrement(id)}><MinusIcon /></Button>
              <Text fontWeight='semibold' fontSize={17}>{quantity}</Text>
              <Button bg='none' p='0' _hover={{ bg: 'none' }} id={id} onClick={() => handleIncrement(id)}><AddIcon /></Button>
       </Stack>
    </Box>
  )
}

export default Counter