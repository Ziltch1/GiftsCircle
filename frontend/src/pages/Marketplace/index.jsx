import { Box, Heading, Text, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import MarketplaceOptions from './MarketplaceOptions';
import SourvenirMarket from './subpages/Market/Sourvenir';
import GiftMarket from './subpages/Market/Gifts';
import Asoebi from './subpages/Market/Asoebi';

const Index = () => {
  const [position, setPosition] = useState(-1);
  const [showProducts, setShowProducts] = useState(false);

  return (
    <Box>
      <Box
        bg="#F5F5F5"
        minH="580px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
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
              <Box textAlign="center" onClick={() => setShowProducts(true)}>
                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg="#00BFB2"
                  h="50px"
                  w="210px"
                  _hover={{ bg: '#00BFB2' }}
                >
                  {' '}
                  Proceed to market
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              <Box>
                {position === 1 && (
                  <GiftMarket setShowProducts={setShowProducts} />
                )}
                {position === 0 && <Asoebi setShowProducts={setShowProducts} />}
                {position === 2 && (
                  <SourvenirMarket setShowProducts={setShowProducts} />
                )}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Index;
