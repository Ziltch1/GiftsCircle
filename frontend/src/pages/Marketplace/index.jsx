import { Box, Heading, Text, Button } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import MarketplaceOptions from './MarketplaceOptions'
import Market from './subpages/Market/Market'
import { GetAsoebiItemsApi } from '../../redux/axios/apis/asoebi'
import { GetGiftItemsApi } from '../../redux/axios/apis/gift'
import Cart from './subpages/Cart/Cart'


const Index = () => {
  const [position, setPosition] = useState(-1);
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [asoebiItems, setAsoebiItems] = useState([]);
  const [gifts, setGifts] = useState([]);

  const getAsoebi = async() => {
    try {
      const res = await GetAsoebiItemsApi();
      const data = await res.data;
      setAsoebiItems(data);
    } catch (error) {
      console.log(error);
    }
  
  }

  const getGiftItems = async () => {
    try {
      const res = await GetGiftItemsApi();
      const data = await res.data;
      setGifts(data);
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
      getAsoebi();
      getGiftItems();
  }, [])

  return (
    <Box>
    <Box bg='#F5F5F5' minH='580px' display='flex' alignItems='center' justifyContent='center'>
       <Box w='90%' mx='auto'>
          {!showProducts ?
          <Box>
              <Box textAlign='center' maxW='540px' mx='auto' mb='8'>
                <Heading fontSize={36} mb='5'>Welcome to marketplace</Heading>
                <Text fontSize={14}>We have created this page so you could find things that you need for your event and easily order for it for yourself.</Text>
              </Box>
              <MarketplaceOptions setPosition={setPosition} setShowProducts={setShowProducts}  />
              <Box textAlign='center' onClick={() => setShowProducts(true)}>
                <Button fontWeight='medium' fontSize={14} color='white' bg='#00BFB2' h='50px' w='210px' _hover={{ bg: '#00BFB2' }}> Proceed to market</Button>
              </Box>
          </Box>
          : 
          <>
           {showCart 
           ? 
           <Cart /> 
           :
           <Box>
                {position === 0 && <Market />}
                {position === 1 && <Market giftItems={asoebiItems} setShowProducts={setShowProducts} setShowCart={setShowCart} />}
                {position === 2 && <Market giftItems={gifts} setShowProducts={setShowProducts} setShowCart={setShowCart} />}
           </Box>}
          </>}
       </Box>
    </Box>
    </Box>
  )
}

export default Index