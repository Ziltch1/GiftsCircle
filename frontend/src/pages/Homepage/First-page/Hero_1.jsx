import React from 'react'
import {Image, Box, Text, Flex, VStack, Heading, Button} from '@chakra-ui/react'
import hero from '../../../assets/hero_image.svg'
import overlay from '../../../assets/overlay_1.svg'
import google_play from '../../../assets/google_play.svg'
import apple_store from '../../../assets/apple_store.svg'
import bgImage from '../../../assets/first-bg.png'

const Hero_1 = () => {
  return (
    <Box w='100%' h='100%' bgImage={bgImage} backgroundSize='cover' backgroundRepeat={'no-repeat'} pt='5' pb='5' overflow={'auto'}>
      <Box w='90%' mx='auto'>
          
          <Box maxW='900px' mx='auto' position={'relative'}>
            <Box>
              <Image src={hero} display='block' mx={'auto'} mt='8' mb='6' w='100%' />
            </Box>

            <Box position='absolute' top='20%' left='-100px' maxW='250px'>
              <Image src={overlay} maxW='100%' />
            </Box>

            <Box maxW='220px' h='46px' borderRadius={'5px'} bg='#CEDBE6' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} left='-20px' top='205px'>
              <Text fontWeight={'medium'} fontSize='14px' px={3}>Your delivery is on it's way!</Text>
            </Box>

            <Box maxW='220px' h='46px' borderRadius={'5px'} bg='#CCF2F0' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} right='-100px' bottom='90px'>
              <Text fontWeight={'medium'} fontSize='14px' px={3}>Your delivery is on it's way!</Text>
            </Box>
          </Box>

          <VStack spacing={8} maxW='736px' h='auto' mx='auto' mt='6' mb='4' textAlign='center'>
            <Heading size={'2xl'} textAlign='center' lineHeight={'58px'} color='#CCF2F0'>Add <b style={{color: '#FF9F1C'}}>gift list</b> when you create your event with <b style={{color: '#00BFB2'}}>Event Circle</b></Heading>
            <Text color='white' maxW='450px' mx='auto'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus quam sed sed proin. Imperdiet velit, tempor, venen</Text>
            <Flex justifyContent={'space-around'} w='450px'>
              <Button bg='none' _hover={{bg: "none"}}><Image src={google_play} /></Button>
              <Button bg='none' _hover={{bg: "none"}}><Image src={apple_store} /></Button>
            </Flex>
          </VStack>
      </Box>
    </Box>
  )
}

export default Hero_1