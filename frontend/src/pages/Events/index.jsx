import React, {useState} from 'react'
import {Box, Text, Heading, Button, Flex, HStack, Image, VStack} from '@chakra-ui/react'
import Search from '../../components/Search/Search'
import Navbar from '../../components/Navbar/Navbar'
import WelcomeModal from '../../components/WelcomeModal/WelcomeModal'
import Tabs from '../../components/Tabs/Tabs'
import eventImage from '../../components/assets/event-image.svg'
import calendarIcon from '../../components/assets/calendar.svg'
import lockIcon from '../../components/assets/lock.svg'
import { CheckIcon } from '@chakra-ui/icons'


const Events = () => {
  const events = [0,1,2,3,4,5,6,7];
  const {isActive, setIsActive} = useState(true)
  const eventData = [
    {
      id: 1,
      image: eventImage,
      title: '',
      description: '',
      date: '',
      status: '',
      
    }
  ]
  return (
    <Box bg='#F5F5F5' h='100%' pb='8'>
      <WelcomeModal />
        <Navbar />
        <Box w='90%' mx='auto'>
              <Tabs />
              <Search />
              <Box textAlign={'center'} mt='20px'>
                {events.length === 0 ?
                  <Box>
                    <Text fontSize={30} fontWeight='medium' mb='3'>Create your first event</Text>
                    <Text fontSize={14} mb='3'>Don’t waste time, click the button at right corner to <br /> create your event attatch your gift list</Text>
                  </Box> 
                  :
                  <Box>
                    {events.map((event) => {
                        return (
                          <Box bg='white' mb='5' py='7' px='8' borderRadius={5}>
                              <HStack justifyContent={'space-between'} alignItems='center'>
                                <Box>
                                  <HStack gap={2.5}>
                                    <Box>
                                      <Image src={eventImage} w='109px' h='109px' borderRadius={5} />
                                    </Box>
                                    <Box>
                                      <Box textAlign={'left'}>
                                        <Heading fontWeight={'medium'} fontSize='18px' lineHeight={'26px'} mb='2'>Wedding of Adejumo Adedayo and Peace Adepeju</Heading>
                                        <Text fontSize={14} textAlign='left' fontWeight={400} mb='2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna amet amet tincidunt nisl sociis metus...</Text>
                                        <Flex fontSize={14} gap={5} color='#717171'>
                                          <Flex alignItems={'center'} gap={1}><Image src={calendarIcon} /><Text>January 20th, 2022</Text></Flex>
                                          <Flex alignItems={'center'} gap={1}><Image src={lockIcon} />989 098 989</Flex>
                                          <Flex alignItems={'center'} gap={1}><CheckIcon color={isActive ? '#00BFB2' : '#717171'} /> <Text color={isActive ? '#00BFB2' : '#717171'}>{isActive ? 'Active' : 'saved to draft'}</Text></Flex>
                                        </Flex>
                                      </Box>
                                    </Box>
                                  </HStack>
                                </Box>

                                <Box>
                                  <Button bg='#00BFB2' color='white' size='sm' fontWeight={'medium'} px='20px' py='10px' borderRadius={5} h='35px'>View event</Button>
                                </Box>
                              </HStack>
                          </Box>
                        )
                    })}
                  </Box>
                }
              </Box>
        </Box>

    </Box>
  )
}

export default Events