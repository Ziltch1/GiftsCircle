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
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { LGAs } from '../../../../Utils/data/LGA';
import { useSelector } from 'react-redux';
import { DeliveryDetailsApi } from '../../../../redux/axios/apis/user';

const DeliveryDetailsForm = () => {
  const states = Object.keys(LGAs);
  const toast = useToast();
  const [lgas, setLgas] = useState(states);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [selectedState, setSelectedState] = useState('Abia');
  const [selectedCity, setSelectedCity] = useState([]);
  const { user } = useSelector(state => state.user);

  const data = {
    address: deliveryAddress,
    city: selectedCity,
    state: selectedState,
    tel: phoneNumber,
    tel2: additionalPhoneNumber,
    userId: user.id,
    postalCode: '100001',
  };

  const handleSubmit = async () => {
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      deliveryAddress &&
      selectedState &&
      selectedCity
    ) {
      try {
        await DeliveryDetailsApi(data);
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

  useEffect(() => {
    console.log(LGAs[selectedState]);
    setLgas(LGAs[selectedState]);
  }, [selectedState]);

  const handleSelectedCity = e => {
    setSelectedCity(e.target.value);
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
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Additional Phone Number</FormLabel>
            <Input
              type="text"
              w="100%"
              value={additionalPhoneNumber}
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
          mb="3"
        >
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Region</FormLabel>
            <Select
              w="100%"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
            >
              {Object.keys(LGAs).map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>City</FormLabel>
            <Select w="100%" value={selectedCity} onChange={handleSelectedCity}>
              {lgas.map((lga, index) => (
                <option key={index} value={lga}>
                  {lga}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
        <Divider />
        <Box p="3" textAlign="right" mt="3">
          <Button mr="4">Cancel</Button>
          <Button
            bg="#00BFB2"
            color="white"
            fontSize={15}
            fontWeight="medium"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default DeliveryDetailsForm;
