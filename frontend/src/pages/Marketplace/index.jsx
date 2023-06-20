import { Box, Heading, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MarketplaceOptions from './MarketplaceOptions';
import SourvenirMarket from './subpages/Market/Sourvenir';
import GiftMarket from './subpages/Market/Gifts';
import Asoebi from './subpages/Market/Asoebi';
import Checkout from './Checkout'
import { dispatch } from '../../redux/store';
import { GetDeliveryDetails } from '../../redux/features/user/service';
import { useSelector } from 'react-redux';

const Index = () => {
  const {user} = useSelector(state => state.user)
  const [position, setPosition] = useState(-1);
  const [showProducts, setShowProducts] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false)
  
  useEffect(() => {
    dispatch(GetDeliveryDetails(user.id));
  }, []);

  return (
    <Box>
      <Box
        bg="#F5F5F5"
        minH="580px"
        display="flex"
        alignItems={showCheckout ? null : 'center'}
        justifyContent={showCheckout ? null : 'center'}
      >
      {showCheckout ? <Checkout setShowCheckout={setShowCheckout} /> : 
        <Box w="90%" mx="auto">
          {!showProducts ? (
            <Box>
              <Box textAlign="center" maxW="540px" mx="auto" mb="8">
                <Heading fontSize={36} mb="5">
                  Welcome to marketplace
                </Heading>
                <Text fontSize={14}>
                  We have created this page so you could find things that you
                  need for your event and easily order for it for yourself.
                </Text>
              </Box>
              <MarketplaceOptions
                setPosition={setPosition}
                setShowProducts={setShowProducts}
              />
              
            </Box>
          ) : (
            <>
              <Box>
                {position === 1 && (
                  <GiftMarket setShowProducts={setShowProducts} setShowCheckout={setShowCheckout} />
                )}
                {position === 0 && <Asoebi setShowProducts={setShowProducts} setShowCheckout={setShowCheckout} />}
                {position === 2 && (
                  <SourvenirMarket setShowProducts={setShowProducts} setShowCheckout={setShowCheckout} />
                )}
              </Box>
            </>
          )}
        </Box>}
      </Box>
    </Box>
  );
};

export default Index;
