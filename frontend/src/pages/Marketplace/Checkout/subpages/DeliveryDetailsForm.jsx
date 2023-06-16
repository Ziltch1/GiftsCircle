import {
  Box,
  FormLabel,
  FormControl,
  Input,
  Divider,
  Heading,
  Stack,
  Select,
  useToast,
  Button, Spinner
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { DeliveryDetailsApi } from '../../../../redux/axios/apis/user';
import { Zones } from '../../../../Utils/data/ZONES';

const DeliveryDetailsForm = ({setShowCheckout}) => {
  const toast = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.user);

  const [selectedState, setSelectedState] = useState("");
  const [selectedLGAs, setSelectedLGAs] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState('')

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedLGAs(Zones[state]);
  };

  const handleLGAsChange = (e) => {
    setSelectedLGA(e.target.value);
    console.log(selectedState, selectedLGA);
  };

  const data = {
    address: deliveryAddress,
    city: selectedLGA,
    state: selectedState,
    tel: phoneNumber,
    tel2: additionalPhoneNumber,
    userId: user.id,
    postalCode: '100001',
    country: 'Nigeria'
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      deliveryAddress &&
      selectedState &&
      selectedLGA
    ) {
      try {
        await DeliveryDetailsApi(data);
        setAdditionalInformation('')
        setAdditionalPhoneNumber('')
        setDeliveryAddress('')
        setPhoneNumber('')
        setLastName('')
        setFirstName('')
        setSelectedLGA('')
        setSelectedState('');
        toast({
          title: 'Success',
          description: 'Delivery details added',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top-right',
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast({
        title: 'Error!',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Box p="5">
      <Heading fontSize={15} mb="5">
        ADD NEW ADDRES
      </Heading>
      <FormControl>
        <Stack
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          spacing={7}
          justifyContent="space-between"
          mb="7"
          alignItems="center"
        >
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>First Name</FormLabel>
            <Input
              type="text"
              w="100%"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Last Name</FormLabel>
            <Input
              type="text"
              w="100%"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Box>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          spacing={7}
          justifyContent="space-between"
          mb="7"
          alignItems="center"
        >
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Phone Number</FormLabel>
            <Input
              type="text"
              w="100%"
              value={phoneNumber}
              maxLength={11}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Additional Phone Number</FormLabel>
            <Input
              type="text"
              w="100%"
              value={additionalPhoneNumber}
              maxLength={11}
              onChange={e => setAdditionalPhoneNumber(e.target.value)}
            />
          </Box>
        </Stack>

        <Stack
          direction="column"
          spacing={7}
          justifyContent="space-between"
          mb="7"
          alignItems="center"
        >
          <Box w="100%">
            <FormLabel fontSize={14}>Delivery Address</FormLabel>
            <Input
              type="text"
              w="100%"
              value={deliveryAddress}
              onChange={e => setDeliveryAddress(e.target.value)}
            />
          </Box>
          <Box w="100%">
            <FormLabel fontSize={14}>Additional Information</FormLabel>
            <Input
              type="text"
              w="100%"
              value={additionalInformation}
              onChange={e => setAdditionalInformation(e.target.value)}
            />
          </Box>
        </Stack>

        <Stack
          direction={{ base: 'column', md: 'column', lg: 'row' }}
          spacing={7}
          justifyContent="space-between"
          alignItems="center"
          mb="6"
        >
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Region</FormLabel>
            <Select w="100%" value={selectedState} onChange={handleStateChange} placeholder='Select region'>
              {Object.keys(Zones).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>State</FormLabel>
            <Select w="100%" value={selectedLGA} onChange={handleLGAsChange}>
              {selectedLGAs?.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
        {/* <Divider my='3' /> */}
        <Box textAlign="right" mt="3">
          <Button 
            mr="4" 
            fontSize={15}
            fontWeight="medium"
            onClick={() => setShowCheckout(false)}
          >
            Cancel
          </Button>
          <Button
            bg="#00BFB2"
            color="white"
            fontSize={15}
            fontWeight="medium"
            onClick={handleSubmit}
          >
            {loading ? <Spinner size='md' /> : 'Save'}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default DeliveryDetailsForm;
