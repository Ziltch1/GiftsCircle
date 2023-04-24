import { Box, Heading, Image, Button, Flex, Text, Mark } from '@chakra-ui/react'
import React from 'react'
import asoebi from '../assets/asoebi.svg'
import sourvenir from '../assets/sourvenirs.svg'
import giftImage from '../assets/giftImage.svg'
import { Link } from 'react-router-dom'

const MarketplaceOptions = ({position, setPosition, setShowProducts}) => {
  const marketOptions = ['Sourvenirs', 'Asoebi', 'Gift items']
  const optionImages = [sourvenir, asoebi, giftImage];
  const cardImage = optionImages.map((item, index) => item);

  return (
    <Box>
        <Flex justifyContent={{base: 'center', md: 'space-between', lg: 'space-between'}} alignItems='center' mb='10' flexWrap='wrap'>
            {marketOptions.map((item, index) => <ImageCard key={index} image={cardImage[index]} text={item} setShowProducts={setShowProducts} setPosition={setPosition} index={index} />)}
        </Flex>

            <Box textAlign='center' onClick={() => setShowProducts(true)}>
                <Button fontWeight='medium' fontSize={14} color='white' bg='#00BFB2' h='50px' w='210px' _hover={{ bg: '#00BFB2' }}>Proceed to market</Button>
            </Box>
    </Box>
  )
}

export default MarketplaceOptions


const ImageCard = ({image, text, setPosition, index, setShowProducts}) => {
    const showData = (index) => {
        setShowProducts(true);
        setPosition(index)
    }
    return (
        <Box w='390px' h='235px' mb='8' cursor='pointer' _hover={{ border: '2px solid lightgray' }} borderRadius={13} onClick={() => showData(index)}>
             <Box w='100%' borderRadius={10} h='100%' backgroundImage={image} backgroundRepeat='no-repeat' backgroundSize='cover' objectFit='cover' display='flex' alignItems='center' justifyContent='center'>
                 <Text color='white' fontSize={24}>{text}</Text>
             </Box>
         </Box>
    )
}