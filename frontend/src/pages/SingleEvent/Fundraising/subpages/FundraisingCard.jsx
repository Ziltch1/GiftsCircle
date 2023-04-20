import { Box, Text, Image, Heading, Button, Flex } from '@chakra-ui/react'
import React from 'react'
import placeHolder from '../../../assets/asoebi.svg'

const FundraisingCard = () => {
  return (
    <Box bg='white' borderRadius={5} p='5' w='100%' mb='8'>
        <Flex gap={4}>
            <Box w='180px' h='140px'>
                <Image src={placeHolder} w='100%' h='100%' objectFit='cover' borderRadius={5} />
            </Box>

            <Box w='800px'>
                <Box mb='3'>
                    <Flex justifyContent='space-between'>
                        <Box w='440px'>
                            <Heading fontSize={18} fontWeight={500} mb='2'>Wedding of Adejumo Adedayo and Peace Adepeju</Heading>
                            <Text fontSize={14}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Urna amet amet tincidunt nisl sociis metus...</Text>
                        </Box>
                        <Box>
                            <Text color='#237804' bg='#D9F7BE' py='5px' px='10px' fontSize={13} borderRadius='100px'>Active</Text>
                        </Box>
                    </Flex>
                </Box>

                <Box>
                    <Flex alignItems='center' justifyContent='space-between'>
                        <Box>
                            <Box w='450px' bg='#EEEEEE' h='8px' borderRadius={5} mb='3'><Box w='150px' bg='#00BFB2' h='8px' borderRadius={5}></Box></Box>
                            <Text fontSize={14}><strong>₦ 34,000</strong> raised out of <strong>₦ 2,909,890</strong></Text>
                        </Box>
                        <Box>
                            <Button bg='#00BFB2' color='white' fontWeight='normal' fontSize={13}>Stop fundraising</Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}

export default FundraisingCard