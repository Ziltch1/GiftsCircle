import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Search from '../../../../components/Search/Search'
import cartIcon from '../../../assets/cart.svg'
import GiftCard from './GiftCard'
import BackButton from '../../../CreateEvent/subpages/BackButton'

const Market = ({giftItems, setShowProducts, setShowCart}) => {
  const [data, setData] = useState(giftItems);
  const showOptions = () => {
    setShowProducts(false);
  }
  return (
    <Box bg='#F5F5F5'>
        <Box minH='600px' w='95%' mx='auto' pt='8'>
            <BackButton action={showOptions} />
            <Box mb='8' mt='5'>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Heading  fontSize={30} mb='2'>Marketplace</Heading>
                        <Text fontSize={14} color='#717171'>This is where you can buy some things you need for your event for your self</Text>
                    </Box>

                    <Box bg='#CCF2F0' w='155px' h='45px' py='3' px='6' cursor='pointer' borderRadius={5} onClick={() => setShowCart(true)}>
                        <Flex gap={2} fontSize={14}>
                            <Image src={cartIcon} />
                            <Text>Cart</Text>
                            <Text bg='#00BFB2' color='white' w='33px' h='21px' borderRadius='100px' textAlign='center' pb='4px' px='3px'>34</Text>
                        </Flex>
                    </Box>
                </Flex>
            </Box>
            <Box mb='7'>
                <Search />
            </Box>
            <Flex  gap="24px" alignItems='center' flexWrap='wrap'>
                {data.map((gift) => <GiftCard id={gift.id} details={gift.title} image={gift.image} amount={gift.amount}  />)}
            </Flex>
        </Box>
    </Box>
  )
}

export default Market


