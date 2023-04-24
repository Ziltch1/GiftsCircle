import { Box, Heading, Image, Button, Flex, Text, Mark } from '@chakra-ui/react'
import React from 'react'
import asoebi from '../assets/asoebi.svg'
import sourvenir from '../assets/sourvenirs.svg'
import giftImage from '../assets/giftImage.svg'
import { Link } from 'react-router-dom'

const MarketplaceOptions = ({ setPosition, setShowProducts}) => {
  const marketOptions = ['Sourvenirs', 'Asoebi', 'Gift items']
  const optionImages = [sourvenir, asoebi, giftImage];
  const cardImage = optionImages.map((item) => item);

  const handleClick = (index) => {
    setPosition(index);
    setShowProducts(true);
  }

  return (
    <Box>
        <Flex justifyContent={{base: 'center', md: 'space-between', lg: 'space-between'}} alignItems='center' mb='10' flexWrap='wrap'>
            {marketOptions.map((item, index) => {
                return (
                    <Box key={index} w='390px' h='235px' mb='8' cursor='pointer' _hover={{ border: '2px solid lightgray' }} borderRadius={13} onClick={() => handleClick(index)}>
                        <Box w='100%' borderRadius={10} h='100%' backgroundImage={cardImage[index]} backgroundRepeat='no-repeat' backgroundSize='cover' objectFit='cover' display='flex' alignItems='center' justifyContent='center'>
                            <Text color='white' fontSize={24}>{item}</Text>
                        </Box>
                    </Box>
                )
            })}
        </Flex>
    </Box>
  )
}

export default MarketplaceOptions
