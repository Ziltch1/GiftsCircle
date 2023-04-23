import { Box, Heading, Image, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import asoebi from '../assets/asoebi.svg'
import sourvenir from '../assets/sourvenirs.svg'
import giftImage from '../assets/giftImage.svg'
import { Link } from 'react-router-dom'

const MarketplaceOptions = () => {
  return (
    <Box>
        <Flex justifyContent={{base: 'center', md: 'space-between', lg: 'space-between'}} alignItems='center' mb='10' flexWrap='wrap'>
              <ImageCard image={sourvenir} text='Sourvenirs' />
              <ImageCard image={asoebi} text='Asoebi' />
              <ImageCard image={giftImage} text='Gift items' />
        </Flex>

       <Link to='/dashboard/marketplace/market'>
            <Box textAlign='center'>
                <Button fontWeight='medium' fontSize={14} color='white' bg='#00BFB2' h='50px' w='210px' _hover={{ bg: '#00BFB2' }}>Proceed to market</Button>
            </Box>
        </Link>
    </Box>
  )
}

export default MarketplaceOptions


const ImageCard = ({image, text}) => {
    return (
        <Box w='340px' h='215px' mb='8' cursor='pointer' _hover={{border: '2px solid lightgray'}} borderRadius={13}>
            <Box w='100%' borderRadius={10} h='100%' backgroundImage={image} backgroundRepeat='no-repeat' backgroundSize='cover' objectFit='cover' display='flex' alignItems='center' justifyContent='center'>
                <Text color='white' fontSize={23}>{text}</Text>
            </Box>
        </Box>
    )
}