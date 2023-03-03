import { Box, Flex, Text, Heading, Input, FormControl, FormLabel } from '@chakra-ui/react'
import React, {useState} from 'react'
import BackButton from '../BackButton'
import axios from 'axios';

const DeliveryDetailsForm = () => {
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [phoneNumber1, setPhoneNumber1] = useState('')
  const [phoneNumber2, setPhoneNumber2] = useState('')
  return (
    <Box h="100%" overflow="auto" mb="16" mt='10' w="750px" mx="auto">
      <Flex alignItems="start" justifyContent="space-between">
        <Box>
          <BackButton />
        </Box>

        <Box w="500px" mx="auto">
          <Box mb='10'>
            <Heading mb='2' fontWeight='semibold' fontSize='30px'>Delivery Details</Heading>
            <Text color='#717171' fontSize={14}>Add the addresses you would like to receive your gifts</Text>
          </Box>

          <Box>
            <FormControl isRequired>
              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>Address</FormLabel>
                <Input type='text' value={address} onChange={(e) => setAddress(e.target.value)}  />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>City</FormLabel>
                <Input type='text' value={city} onChange={(e) => setCity(e.target.value)} />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>State</FormLabel>
                <Input type='text' value={state} onChange={(e) => setState(e.target.value)} />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>Country</FormLabel>
                <Input type='text' value={country} onChange={(e) => setCountry(e.target.value)} />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>Postal Code</FormLabel>
                <Input type='text' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>Phone Number 1</FormLabel>
                <Input type='text' value={phoneNumber1} onChange={(e) => setPhoneNumber1(e.target.value)} />
              </Box>

              <Box mb='6'>
                <FormLabel fontWeight='semibold' fontSize={15}>Phone Number 2</FormLabel>
                <Input type='text' value={phoneNumber2} onChange={(e) => setPhoneNumber2(e.target.value)} />
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default DeliveryDetailsForm