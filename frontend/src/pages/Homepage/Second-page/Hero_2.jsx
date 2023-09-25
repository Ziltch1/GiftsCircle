import React from 'react'
import {Box, Image, Text, Heading, Flex, Button, Stack} from '@chakra-ui/react'
import bgImage from '../../../assets/second_bg.svg'
import google_play from '../../../assets/google_play.svg'
import apple_store from '../../../assets/apple_store.svg'
import overlay_1 from '../../../assets/summary_card.svg'
import overlay_2 from '../../../assets/summary_card_2.svg'
import bg from '../../../assets/second-bg.png'

const Hero_2 = () => {
  return (
    <Box w='100%' bgImage={bg} backgroundSize='cover' backgroundRepeat={'no-repeat'} pt={[0,9]} pb='12'>
      <Box maxW={['100%', '90%']} mx='auto'>
        <Flex justifyContent={'space-between'} alignItems='center' flexWrap={'wrap-reverse'}>
          <Box maxW={'539px'} textAlign={['center', 'left']}>
            <Heading size={['xl', '2xl']} lineHeight={['50px', '62px']} mb='4'>Add gift list when you create your event with <b style={{ color: '#00BFB2' }}>Event Circle</b></Heading>
            <Box p={[2, 0]}>
              <Text fontWeight={'medium'} mb='6' fontSize={'18px'}>Event Circle app allows you to create event, add gift list and allow yor guests to purchase from your gift list</Text>
            </Box>
            <Stack direction='row' justifyContent={['center', 'flex-start']} flexWrap='wrap' alignItems='center'>
              <Button bg='none' _hover={{ bg: "none" }} mb={[10, 0]}><Image src={google_play} /></Button>
              <Button bg='none' _hover={{ bg: "none" }}><Image src={apple_store} /></Button>
            </Stack>
          </Box>

          <Box position={'relative'} w={['100%', '505px']} mb={[20, 0]}>
            <Box w={['100%', '90%']}>
              <Image src={bgImage} w='100%' />
            </Box>

            <Box position={'absolute'} top={['20px', '150px']} left={['120px', '-150px']}>
              <Image src={overlay_1} />
            </Box>

            <Box position={'absolute'} left={['-20px','70px']} top={['310px', '397px']}>
              <Image src={overlay_2} w={['80%', '100%']} />
            </Box>
          </Box>
        </Flex>
      </Box>   
    </Box>
  )
}

export default Hero_2