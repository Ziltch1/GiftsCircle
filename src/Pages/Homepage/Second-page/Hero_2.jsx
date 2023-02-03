import React from 'react'
import {Box, Image, Text, Heading, Flex, Stack, Button} from '@chakra-ui/react'
import bgImage from '../../../assets/second_bg.svg'
import google_play from '../../../assets/google_play.svg'
import apple_store from '../../../assets/apple_store.svg'
import overlay_1 from '../../../assets/summary_card.svg'
import overlay_2 from '../../../assets/summary_card_2.svg'
import bg from '../../../assets/second-bg.png'

const Hero_2 = () => {
  return (
    <Box w='100%' bgImage={bg} backgroundSize='cover' backgroundRepeat={'no-repeat'} py='9'>
      <Box maxW={'90%'} mx='auto'>
        <Flex justifyContent={'space-between'} alignItems='center' flexWrap={'wrap'}>
          <Box maxW={'539px'}>
            <Heading size='2xl' lineHeight={'62px'} mb='3'>Add gift list when you create your event with <b style={{ color: '#00BFB2' }}>Gift Circle</b></Heading>
            <Text fontWeight={'semibold'} mb='5'>Gift Circle app allows you to create event, add gift list and allow yor guests to purchase from your gift list</Text>
            <Flex justifyContent={'flex-start'} >
              <Button bg='none' _hover={{ bg: "none" }}><Image src={google_play} /></Button>
              <Button bg='none' _hover={{ bg: "none" }}><Image src={apple_store} /></Button>
            </Flex>
          </Box>

          <Box position={'relative'} maxW='505px'>
            <Box w='90%'>
              <Image src={bgImage} w='100%' />
            </Box>

            <Box position={'absolute'} top='150px' left='-150px'>
              <Image src={overlay_1} />
            </Box>

            <Box position={'absolute'} left='70px' top='397px'>
              <Image src={overlay_2} />
            </Box>
          </Box>
        </Flex>
      </Box>   
    </Box>
  )
}

export default Hero_2