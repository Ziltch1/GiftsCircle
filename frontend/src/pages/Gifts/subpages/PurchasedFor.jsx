import { Box, Heading, Text, HStack, Image, Flex, Button } from '@chakra-ui/react'
import React from 'react'
import calendarIcon from '../../../components/assets/calendar.svg';
import giftIcon from '../../assets/giftIconSmall.svg';
import image from '../../assets/sample.svg';


const PurchasedFor = () => {
  const gifts = [1,2,3,4,5,6,7,8]
  return (
    <Box>
        {
        gifts.length < 1 
            ? 
              <Box textAlign='center' w='100%' h='300px' display='flex' alignItems='center' justifyContent='center'>
                  <Box w='400px'>
                      <Heading fontWeight='semibold' mb='2' fontSize={30}>Gift list is empty</Heading>
                      <Text color='#8C8C8C' fontSize={16}>This is where you will see if any gift has been purchsed for you</Text>
                  </Box>
              </Box>
            :
            <Box w='100%' h='100%'>
                {gifts.map((gift,index) => <GiftItem key={index} />)}
            </Box>
        }
    </Box>
  )
}

export default PurchasedFor


export const GiftItem = () => {
    return (
        <Box mt='8'>
            <Box bg="white" mb="5" py="7" px="8" borderRadius={5}>
                <HStack justifyContent={'space-between'} alignItems="center">
                    <Box>
                        <HStack gap={2.5}>
                            <Box>
                                <Image
                                    src={image}
                                    w="120px"
                                    h="110px"
                                    borderRadius={5}
                                />
                            </Box>
                            <Box>
                                <Box textAlign={'left'}>
                                    <Heading
                                        fontWeight={'medium'}
                                        fontSize="18px"
                                        lineHeight={'26px'}
                                        mb="2"
                                    >
                                        Wedding Ceremony of Andrew Tate
                                        {/* {title} */}
                                    </Heading>
                                    <Text
                                        fontSize={14}
                                        textAlign="left"
                                        fontWeight={400}
                                        mb="2"
                                    >
                                        This is a playground
                                    </Text>
                                    <Flex fontSize={14} gap={5} color="#717171">
                                        <Flex alignItems={'center'} gap={1}>
                                            <Image src={calendarIcon} />
                                            <Text>January 20th, 2025</Text>
                                            {/* <Text>{new Date(date).toDateString()}</Text> */}
                                        </Flex>
                                        <Flex alignItems={'center'} gap={1}>
                                            <Image src={giftIcon} />
                                            <Text>33 gift items attached</Text>
                                        </Flex>
                                        {/* <Flex alignItems={'center'} gap={1}>
                                            <CheckIcon color={published ? '#00BFB2' : '#717171'} />{' '}
                                            <Text color={published ? '#00BFB2' : '#717171'}>
                                                {published ? 'Active' : 'saved to draft'}
                                            </Text>
                                        </Flex> */}
                                    </Flex>
                                </Box>
                            </Box>
                        </HStack>
                    </Box>

                    <Box>
                        {/* <Link to={`/dashboard/event_details/${id}`}> */}
                            <Button
                                bg="#00BFB2"
                                color="white"
                                size="sm"
                                fontWeight={'medium'}
                                px="20px"
                                py="10px"
                                borderRadius={5}
                                h="35px"
                                boxShadow='md'
                            >
                                View gifts
                            </Button>
                        {/* </Link> */}
                    </Box>
                </HStack>
            </Box>
        </Box>
    )
}