import React from 'react'
import {Image, Box, Text, Flex, VStack, Heading, Button, Stack} from '@chakra-ui/react'
import hero from '../../../assets/hero_image.svg'
import overlay from '../../../assets/overlay_1.svg'
import google_play from '../../../assets/google_play.svg'
import apple_store from '../../../assets/apple_store.svg'
import bgImage from '../../../assets/first-bg.png'

const Hero_1 = () => {
  return (
    <Box w='100%' h='100%' bgImage={bgImage} backgroundSize='cover' backgroundRepeat={'no-repeat'} pt={[0, 5,5]} pb='5' overflow={'auto'}>
      <Box w={['100%', '90%', '90%']} mx='auto'>
          
          <Box w={['100%', '900px', '900px']} mx='auto' position={'relative'}>
            <Box>
              <Image src={hero} display='block' mx={'auto'} objectFit={['cover', 'contain']} mt={[0,8,8]} mb='6' w='100%' h={{base: '470px', md: 'auto', lg: 'auto'}} />
            </Box>

            <Box position='absolute' top='20%' left={['60px', '-100px']} maxW='250px'>
              <Image src={overlay} maxW='100%' />
            </Box>

            <Box maxW='220px' h='46px' borderRadius={'5px'} bg='#CEDBE6' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} left={['85px', '-20px']} top={['235px', '205px']}>
              <Text fontWeight={'medium'} fontSize='14px' px={3}>Your delivery is on it's way!</Text>
            </Box>

            <Box maxW='220px' h='46px' borderRadius={'5px'} bg='#CCF2F0' display={'flex'} justifyContent='center' alignItems='center' position={'absolute'} right={['100px', '-100px']} bottom={['-20px', '90px']}>
              <Text fontWeight={'medium'} fontSize='14px' px={3}>Your delivery is on it's way!</Text>
            </Box>
          </Box>

          <VStack spacing={8} maxW='736px' h='auto' mx='auto' mt={[12, 6]} mb='4' textAlign='center'>
            <Heading size={['xl', '2xl']} textAlign='center' lineHeight={'58px'} color='#CCF2F0'>
              Add <b style={{color: '#FF9F1C'}}>gift list</b> when you create your event with <b style={{color: '#00BFB2'}}>Event Circle</b></Heading>
            <Box maxW='460px' mx='auto' p={[4, 0]}>
              <Text color='white' lineHeight={8}>
                On our website, we aim to provide you with a seamless and enjoyable experience when it comes to planning memorable events and finding the perfect gifts for these events. Whether you're organizing a grand celebration or looking for a special present for a loved one, we're here to make your life easier.
              </Text>
            </Box>
            <Stack justifyContent={'space-around'} maxW='450px' flexDirection={['column', 'row']} spacing={[8,0]}>
              <Button bg='none' _hover={{bg: "none"}}><Image src={google_play} /></Button>
              <Button bg='none' _hover={{bg: "none"}}><Image src={apple_store} /></Button>
            </Stack>
          </VStack>
      </Box>
    </Box>
  )
}

export default Hero_1