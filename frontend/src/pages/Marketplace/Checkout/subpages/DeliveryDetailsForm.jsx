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
import React, { useEffect, useState } from 'react';
import { LGAs } from '../../../../Utils/data/LGA';
import { useSelector } from 'react-redux';
import { DeliveryDetailsApi } from '../../../../redux/axios/apis/user';

const DeliveryDetailsForm = ({setShowDeliveryForm}) => {
  const toast = useToast();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGAs, setSelectedLGAs] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(state => state.user);

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedLGAs(LGAs[state]);
  };

  const handleLGAsChange = (e) => {
    setSelectedLGA(e.target.value)
    // Handle changes in the second select field, if needed
  };

  const data = {
    firstname: firstName,
    lastname: lastName,
    address: deliveryAddress,
    info: additionalInformation,
    lga: selectedLGA,
    state: selectedState,
    tel: phoneNumber,
    tel2: additionalPhoneNumber,
    userId: user.id,
  };

  const handleSubmit = async () => {
    if (
      firstName &&
      lastName &&
      phoneNumber &&
      deliveryAddress &&
      selectedState &&
      selectedLGA
    ) {
      setLoading(true);
      try {
        await DeliveryDetailsApi(data);
        setFirstName('');
        setLastName('')
        setDeliveryAddress('');
        setAdditionalInformation('');
        setSelectedLGA('')
        setSelectedState('')
        setPhoneNumber('')
        setAdditionalPhoneNumber('')
        await setLoading(false)
        setShowDeliveryForm(false)
      } catch (error) {
        console.log(error);
        setLoading(false);
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
              maxLength={11}
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Additional Phone Number</FormLabel>
            <Input
              type="text"
              maxLength={11}
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
            <Select value={selectedState} onChange={handleStateChange}>
              {Object.keys(LGAs).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>City</FormLabel>
            <Select value={selectedLGA} onChange={handleLGAsChange}>
              {selectedLGAs?.map((lga) => (
                <option key={lga} value={lga}>
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
            {loading ? <Spinner size='md' /> : 'Save'}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default DeliveryDetailsForm;