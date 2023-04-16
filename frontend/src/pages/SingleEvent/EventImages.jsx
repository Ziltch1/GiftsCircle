import React from 'react'
import { Box, Image, Text, Heading, Flex, Button, Tooltip, useToast } from '@chakra-ui/react'
import copyIcon from '../../components/assets/copy.svg'
import facebook from '../../components/assets/facebook.svg'
import instagram from '../../components/assets/instagram.svg'
import whatsapp from '../../components/assets/whatsapp.svg'
import linkedin from '../../components/assets/linkedin.svg'
import twitter from '../../components/assets/twitter.svg'
import defaultImage from '../../components/assets/default-image.svg'
import BackButton from '../CreateEvent/subpages/BackButton'

const EventImages = ({newEvent}) => {
    const image = newEvent.image;
    const imageUrl = image
    const toast = useToast();

    const copyEventId = async (id) => {
        try {
            await navigator.clipboard.writeText(id)
            toast({
                description: 'Event Id copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            console.log(error);
        }
    }

    const copyCoHostCode = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            toast({
                description: 'Co-host code copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            console.log(error);
        }
    }

    const copyCoHostLink = async (link) => {
        try {
            await navigator.clipboard.writeText(link)
            toast({
                description: 'Co-host link copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            console.log(error);
        }
    }

    const copyGuestCode = async (code) => {
        try {
            await navigator.clipboard.writeText(code);
            toast({
                description: 'Guest code copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            console.log(error);
        }
    }

    const copyGuestLink = async (link) => {
        try {
            await navigator.clipboard.writeText(link);
            toast({
                description: 'Guest link copied',
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-right'
            })
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
        < Box mb = '6' mt='5'>
            <Flex justifyContent={'space-between'} alignItems='center'>
                <Box bg='#EEEEEE' w='68%' h='474px' borderRadius={5} display='flex' alignItems={'center'} justifyContent='center' boxShadow={'md'}>
                  {newEvent.image ? <Image src={imageUrl} w='100%' h='100%' objectFit='cover' borderRadius={5} /> : <Image src={defaultImage} />}
                </Box>

                <Box w='30%' h='474px' bg='#EEEEEE' borderRadius={5} p='6' boxShadow='md'>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event ID</Text>
                        <Flex justifyContent={'space-between'} alignItems='center'>
                            <Heading fontWeight={'medium'} fontSize='14'>{newEvent.id}</Heading>
                              <Tooltip hasArrow label='copy event id' bg='gray.300' color='black'>
                                  <Image src={copyIcon} w='20px' h='20px' onClick={() => copyEventId(newEvent.id)} />
                              </Tooltip>
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Co-host Code</Text>
                        <Flex justifyContent={'space-between'} alignItems='center'>
                            <Heading fontWeight={'medium'} fontSize='14'>{newEvent.coHostCode}</Heading>
                              <Tooltip hasArrow label='copy co-host code' bg='gray.300' color='black'>
                                  <Image src={copyIcon} w='20px' h='20px' onClick={() => copyCoHostCode(newEvent.coHostCode)} />
                              </Tooltip>
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Co-host link</Text>
                        <Flex justifyContent={'space-between'} alignItems='center'>
                            <Heading fontWeight={'medium'} fontSize='12' w='220px' lineHeight={5}>{`https://giftscircle.netlify.app/event/join/${newEvent.id}`}</Heading>
                            <Tooltip hasArrow label='copy co-host-link' bg='gray.300' color='black'>
                                <Image src={copyIcon} w='20px' h='20px' onClick={() => copyCoHostLink(`https://giftscircle.netlify.app/event/join/${newEvent.id}`)} />
                            </Tooltip>
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event Guest Code</Text>
                        <Flex justifyContent={'space-between'} alignItems='center'>
                            <Heading fontWeight={'medium'} fontSize='14'>{newEvent.guestCode}</Heading>
                            <Tooltip hasArrow label='copy guest code' bg='gray.300' color='black'>
                                <Image src={copyIcon} w='20px' h='20px' onClick={() => copyGuestCode(newEvent.guestCode)} />
                            </Tooltip>
                        </Flex>
                    </Box>

                    <Box mb='4'>
                        <Text fontSize={14} mb='1'>Event Guest link</Text>
                          <Flex justifyContent={'space-between'} alignItems='center'>
                            <Heading fontWeight={'medium'} fontSize='12' w='220px' lineHeight={5}>{`https://giftscircle.netlify.app/event/join/${newEvent.id}`}</Heading>
                            <Tooltip hasArrow label='copy guest link' bg='gray.300' color='black'>
                                <Image src={copyIcon} w='20px' h='20px' onClick={() => copyGuestLink(`https://giftscircle.netlify.app/event/join/${newEvent.id}`)} />
                            </Tooltip>
                        </Flex>
                    </Box>

                    <Box mb='5' fontSize={14}>
                        <Flex justifyContent='space-between' alignItems='center'>
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
    </>
  )
}

export default EventImages