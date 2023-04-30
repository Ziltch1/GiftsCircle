import React, {useState} from 'react'
import {Box, FormLabel, Input, Button, FormControl, Heading, Text} from '@chakra-ui/react'
import BackButton from '../../../../CreateEvent/subpages/BackButton';
import AsoebiMarket from './AsoebiMarket';

const Index = ({setShowProducts, setShowCart, giftItems}) => {
  const [eventId, setEventId] = useState('');
  const [showAsoebi, setShowAsoebi] = useState(false)

  const handleClick = () => {
        console.log(eventId);
        setShowAsoebi(true);
  }
  return (
    <>
    {!showAsoebi ? 
      <Box w={{ base: '350px', md: '500px', lg: '500px' }} mx="auto" h="auto">
          <BackButton action={() => setShowProducts(false)} />
          <Heading textAlign="center" my="8" fontWeight="medium" fontSize={25} textTransform='capitalize'>
              Add Asoebi to event
          </Heading>

          <FormControl>
              
                  <Box mb="5">
                      <FormLabel>Enter Event Id</FormLabel>
                      <Input
                          placeholder="Please enter the guest code"
                          bg="#F4F4F4"
                          fontSize={14}
                          _placeholder={{ color: '#A8A8A8' }}
                          value={eventId}
                          onChange={e => setEventId(e.target.value)}
                      />
                  </Box>
              

              <Text fontSize={14} mb="5" fontWeight="medium">
                  By clicking "Add Asoebi", you agree to our Terms of Services and Privacy
                  Statement
              </Text>
              <Box textAlign="center">
                  <Button
                      w="100%"
                      bg="#00BFB2"
                      fontWeight="medium"
                      fontSize={14}
                      color="white"
                      onClick={handleClick}
                  >
                      Proceed to marketplace
                  </Button>
              </Box>
          </FormControl>
      </Box>
      : <AsoebiMarket setShowProducts={setShowProducts} giftItems={giftItems} setShowCart={setShowCart} />}
    </>
  )
}

export default Index