import React from 'react'
import { Box, Image, Text, Heading, Flex, Button } from '@chakra-ui/react'
import copyIcon from '../../components/assets/copy.svg'
import facebook from '../../components/assets/facebook.svg'
import instagram from '../../components/assets/instagram.svg'
import whatsapp from '../../components/assets/whatsapp.svg'
import linkedin from '../../components/assets/linkedin.svg'
import twitter from '../../components/assets/twitter.svg'
import defaultImage from '../../components/assets/default-image.svg'

const EventImages = ({newEvent}) => {

  return (
        < Box mb = '6' >
            <Flex justifyContent={'space-between'} alignItems='center'>
                <Box bg='#EEEEEE' w='68%' h='444px' borderRadius={5} display='flex' alignItems={'center'} justifyContent='center' boxShadow={'md'}>
                    {/* <Image src={image ? defaultImage : `https://giftcircle-ws.onrender.com/api/event/UserEvents/${userId}/image/${image}`} /> */}
                </Box>

                <Box w='30%' h='444px' bg='#EEEEEE' borderRadius={5} p='6' boxShadow='md'>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event ID</Text>
                        <Flex justifyContent={'space-between'}>
                            <Heading fontWeight={'medium'} fontSize='16'>{newEvent[0]?.id}</Heading>
                            <Image src={copyIcon} w='20px' h='20px' />
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Co-host Code</Text>
                        <Flex justifyContent={'space-between'}>
                            <Heading fontWeight={'medium'} fontSize='16'>{newEvent[0]?.coHostCode}</Heading>
                            <Image src={copyIcon} w='20px' h='20px' />
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Co-host link</Text>
                        <Flex justifyContent={'space-between'}>
                            <Heading fontWeight={'medium'} fontSize='12'>https://www.giftcircle.com/e/i-am</Heading>
                            <Image src={copyIcon} w='20px' h='20px' />
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event Guest Code</Text>
                        <Flex justifyContent={'space-between'}>
                            <Heading fontWeight={'medium'} fontSize='16'>{newEvent[0]?.guestCode}</Heading>
                            <Image src={copyIcon} w='20px' h='20px' />
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event URl</Text>
                        <Flex justifyContent={'space-between'}>
                            <Heading fontWeight={'medium'} fontSize='12'>https://www.giftcircle.com/e/i-am</Heading>
                            <Image src={copyIcon} w='20px' h='20px' />
                        </Flex>
                    </Box>

                    <Box mb='5' fontSize={14}>
                        <Flex justifyContent='space-between'>
                            <Text fontWeight='medium'>Share on: </Text>
                            <Box>
                                <Flex gap={3}>
                                    <Box><Image src={facebook} /></Box>
                                    <Box><Image src={twitter} /></Box>
                                    <Box><Image src={whatsapp} /></Box>
                                    <Box><Image src={instagram} /></Box>
                                    <Box><Image src={linkedin} /></Box>
                                </Flex>
                            </Box>
                        </Flex>
                    </Box>

                    <Button bg='#00BFB2' color='white' w='100%' fontWeight='medium' fontSize='14px' boxShadow='md'>Edit Event</Button>

                </Box>
            </Flex>
      </Box >
  )
}

export default EventImages