import { Box, Text, Image, Button, Flex} from '@chakra-ui/react'
import React from 'react'
import cartItemImg from '../../../assets/giftItemImage.svg'
import { DeleteIcon, MinusIcon, AddIcon } from '@chakra-ui/icons'

const CartItem = ({setShowModal}) => {
  return (
    <Box w='100%' h='130px' bg='#FAFAFA' p='4' mb='5'>
      <Flex alignItems='center'>
        <Box w='20%'>
          <Image src={cartItemImg} h='100px' w='120px' objectFit='cover' borderRadius={5} />
        </Box>

        <Box w='80%'>
          <Box mb='2' display='flex' justifyContent='space-between'>
            <Text w='75%' fontWeight={600} fontSize={16}>XIAOMI Redmi Note 11S, 8GB/128GB, 5000 MAh Battery - Twilight Blue</Text>
            <Text fontWeight={600} fontSize={16}>₦ 285,455</Text>
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Text color='#F5222D' fontSize={14} cursor='pointer' onClick={() => setShowModal(true)}><DeleteIcon/> Remove from list</Text>
            <Box display='flex' justifyContent='space-between' alignItems='center' bg='#00BFB2' borderRadius={3} color='white' w='120px'>
              <Button bg='none' _hover={{ bg: 'none' }} fontSize={15}><MinusIcon/></Button>
              <Text>2</Text>
              <Button bg='none' _hover={{bg: 'none'}} fontSize={15}><AddIcon/></Button>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default CartItem