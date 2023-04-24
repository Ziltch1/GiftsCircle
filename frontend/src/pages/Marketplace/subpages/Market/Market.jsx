import { Box, Heading, Text, Image, Flex } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Search from '../../../../components/Search/Search'
import cartIcon from '../../../assets/cart.svg'
import GiftCard from './GiftCard'
import BackButton from '../../../CreateEvent/subpages/BackButton'

const Market = ({giftItems, setShowproducts, showProducts}) => {
  const [data, setData] = useState(giftItems);
  const showOptions = () => {
    setShowproducts(!showProducts);
  }
  return (
    <Box bg='#F5F5F5'>
        <Box minH='600px' w='90%' mx='auto' pt='8'>
            <BackButton action={showOptions} />
            <Box mb='8' mt='5'>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Box>
                        <Heading  fontSize={30} mb='2'>Marketplace</Heading>
                        <Text fontSize={14} color='#717171'>This is where you can buy some things you need for your event for your self</Text>
                    </Box>

                    <Box bg='#CCF2F0' w='155px' h='45px' py='3' px='6' cursor='pointer' borderRadius={5}>
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
            <Flex  justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                {data.map((gift) => <GiftCard id={gift.id} details={gift.details} image={gift.image} amount={gift.amount}  />)}
            </Flex>
        </Box>
    </Box>
  )
}

export default Market


