import React from 'react'
import {Image, Box, Text, Flex, VStack, Card, CardBody, Heading, Button} from '@chakra-ui/react'
import hero from '../../../assets/hero_image.svg'
import overlay from '../../../assets/overlay_1.svg'
import google_play from '../../../assets/google_play.svg'
import apple_store from '../../../assets/apple_store.svg'

const Hero_1 = () => {
  return (
    <Box w='100%' bg='#0C4C84' pt='5' pb='5' position='absolute' h='auto' overflow={'auto'}>
      <Box w='90%' mx='auto'>
          <Box>
              <Image src={hero} display='block' mx={'auto'} mt='8' mb='6' />
          </Box>

          <Box position='absolute' top='20%' left='5%'>
            <Image src={overlay} />
          </Box>

          <Box w='226px' h='46px' borderRadius={'5px'} bg='#CEDBE6' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} left='135px' top='315px'>
            <Text fontWeight={'semibold'}>Your delivery is on it's way!</Text>
          </Box>

          <Box w='226px' h='46px' borderRadius={'5px'} bg='#CCF2F0' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} right='60px' top='430px'>
            <Text fontWeight={'semibold'}>Your delivery is on it's way!</Text>
          </Box>

          <VStack spacing={8} maxW='736px' h='auto' mx='auto' mt='6' mb='4' textAlign='center'>
            <Heading size={'2xl'} textAlign='center' lineHeight={'58px'} color='#CCF2F0'>Add <b style={{color: '#FF9F1C'}}>gift list</b> when you create your event with <b style={{color: '#00BFB2'}}>Gift Circle</b></Heading>
            <Text color='white' maxW='450px' mx='auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus quam sed sed proin. Imperdiet velit, tempor, venen</Text>
            <Flex justifyContent={'space-around'} w='450px'>
              <Button bg='none' _hover={{bg: "none"}}><Image src={google_play} w='80%' /></Button>
              <Button bg='none' _hover={{bg: "none"}}><Image src={apple_store} w='80%' /></Button>
            </Flex>
          </VStack>
      </Box>
    </Box>
  )
}

export default Hero_1