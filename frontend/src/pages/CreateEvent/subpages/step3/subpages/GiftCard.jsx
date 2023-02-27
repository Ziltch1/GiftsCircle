import { Box, Image, Button, Text, Flex } from '@chakra-ui/react'
import React from 'react'
import giftImage from '../../../../assets/gift.svg'
import GiftDetails from './GiftDetails'

const GiftCard = ({openGiftDetails, setOpenGiftDetails}) => {
  const cards = [1,2,3,4,5,6,7,8,9,10,11]
  const openDrawer = () => {
    setOpenGiftDetails(true);
  }
  return (
    <Flex alignItems='center' justifyContent='space-between' flexWrap='wrap'>
      {openGiftDetails && <GiftDetails setOpenGiftDetails={setOpenGiftDetails} />}
      {cards.map((card) => {
        return (
          <Box w='285px' minH='260px' bg='white' p='2.5' borderRadius={10} boxShadow='sm' mb='5' onClick={openDrawer} cursor='pointer'>
            <Image src={giftImage} w='279' h='142px' borderRadius={10} alt='gift item image' display='block' mx='auto' mb='2.5' />
            <Text fontSize={14} fontWeight={400} mb='2' color='#383838'>Traditional Olive Wood 5 piece Kitchen Utensil set</Text>
            <Flex alignItems='center' justifyContent='space-between'>
              <Text color='#27272E' fontWeight={600} fontSize={18}>₦ 155,000</Text>
              <Button fontSize={13} fontWeight={500} bg='#00BFB2' color='white' w='129px' h='40px'>Add to list</Button>
            </Flex>
          </Box>
        )
      })}
    </Flex>
  )
}

export default GiftCard