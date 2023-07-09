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
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { LGAs } from '../../../../../../Utils/data/LGA';
import { DeliveryDetailsApi, UpdateDeliveryDetailsApi } from '../../../../../../redux/axios/apis/delivery';
import { dispatch } from '../../../../../../redux/store';
import { GetDeliveryDetails } from '../../../../../../redux/features/user/service';

const DeliveryDetailsForm = ({
  setShowDeliveryForm,
  selectedDeliveryDetails,
  setSelectedDeliveryDetails,
}) => {
  const toast = useToast();
  const [firstName, setFirstName] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.firstname : ''
  );
  const [lastName, setLastName] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.lastname : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.tel : ''
  );
  const [additionalPhoneNumber, setAdditionalPhoneNumber] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.tel2 : ''
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.address : ''
  );
  const [additionalInformation, setAdditionalInformation] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.info : ''
  );
  const [selectedState, setSelectedState] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.state : 'Abia'
  );
  const [selectedLGAs, setSelectedLGAs] = useState([]);
  const [selectedLGA, setSelectedLGA] = useState(
    selectedDeliveryDetails ? selectedDeliveryDetails.lga : 'Ukwa East'
  );
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    setSelectedLGAs(LGAs[selectedState]);
  }, [selectedState]);

  const handleLGAsChange = e => {
    setSelectedLGA(e.target.value);
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
    if (selectedDeliveryDetails) {
    }
    if (
      firstName !== '' &&
      lastName !== '' &&
      phoneNumber !== '' &&
      deliveryAddress !== '' &&
      selectedState !== '' &&
      selectedLGA !== ''
    ) {
      setLoading(true);
      try {
        const res = await DeliveryDetailsApi(data);
        if (res.data) {
          dispatch(GetDeliveryDetails(user.id));
        }
        setFirstName('');
        setLastName('');
        setDeliveryAddress('');
        setAdditionalInformation('');
        setSelectedLGA('');
        setSelectedState('');
        setPhoneNumber('');
        setAdditionalPhoneNumber('');
        setShowDeliveryForm(false);
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

  const UpdateDeliveryDetails = async () => {
    const res = await UpdateDeliveryDetailsApi(
      data,
      selectedDeliveryDetails.id
    );
    if (res.data) {
      dispatch(GetDeliveryDetails(selectedDeliveryDetails.userId));
      setShowDeliveryForm(false);
      setSelectedDeliveryDetails(null);
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
            <Select
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              placeholder="Select State"
            >
              {Object.keys(LGAs).map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>City</FormLabel>
            <Select
              value={selectedLGA}
              onChange={handleLGAsChange}
              placeholder="Select LGA"
            >
              {selectedLGAs?.map(lga => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </Select>
          </Box>
        </Stack>
        <Divider />
        <Box p="3" textAlign="right" mt="3">
          <Button mr="4" onClick={() => setShowDeliveryForm(false)}>
            Cancel
          </Button>
          <Button
            bg="#00BFB2"
            color="white"
            fontSize={15}
            fontWeight="medium"
            onClick={() =>
              selectedDeliveryDetails ? UpdateDeliveryDetails() : handleSubmit()
            }
          >
            {loading ? <Spinner size="md" /> : 'Save'}
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default DeliveryDetailsForm;
