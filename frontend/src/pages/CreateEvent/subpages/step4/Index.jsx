import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Stack,
  Select,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackButton from '../../../../components/Buttons/BackButton';
import FormFooter from '../../components/FormFooter';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import {
  DeliveryDetailsApi,
  UpdateDeliveryDetailsApi,
} from '../../../../redux/axios/apis/delivery';
import { LGAs } from '../../../../Utils/data/LGA';
import { setEventDeliveryDetails } from '../../../../redux/features/events/eventSlice';

const DeliveryDetailsForm = ({ step, setStep }) => {
  const { user } = useSelector(state => state.user);
  const { eventDeliveryDetails } = useSelector(state => state.event);
  const { newEvent } = useSelector(state => state.event);
  const toast = useToast();

  const [firstName, setFirstName] = useState(
    eventDeliveryDetails?.firstname ? eventDeliveryDetails?.firstname : ''
  );
  const [lastName, setLastName] = useState(
    eventDeliveryDetails?.lastname ? eventDeliveryDetails?.lastname : ''
  );
  const [address, setAddress] = useState(
    eventDeliveryDetails?.address ? eventDeliveryDetails?.address : ''
  );
  const [info, setInfo] = useState(
    eventDeliveryDetails?.info ? eventDeliveryDetails?.info : ''
  );
  const [lga, setLga] = useState(
    eventDeliveryDetails?.lga ? eventDeliveryDetails?.lga : ''
  );
  const [state, setState] = useState(
    eventDeliveryDetails?.state ? eventDeliveryDetails?.state : ''
  );
  const [phoneNumber, setPhoneNumber] = useState(
    eventDeliveryDetails?.tel ? eventDeliveryDetails?.tel : ''
  );
  const [phoneNumber2, setPhoneNumber2] = useState(
    eventDeliveryDetails?.tel2 ? eventDeliveryDetails?.tel2 : ''
  );
  const [selectedLGAs, setSelectedLGAs] = useState([]);

  useEffect(() => {
    setSelectedLGAs(LGAs[state]);
  }, [state]);

  const handleSubmit = async () => {
    if (address && lga && state && firstName && lastName && phoneNumber) {
      try {
        if (eventDeliveryDetails) {
          const formBody = {
            firstname: firstName,
            lastname: lastName,
            address: address,
            info: info,
            lga: lga,
            state: state,
            tel: phoneNumber,
            tel2: phoneNumber2,
          };

          const res = await UpdateDeliveryDetailsApi(
            formBody,
            eventDeliveryDetails?.id
          );
          dispatch(setEventDeliveryDetails(res.data));
          setStep(step + 1);
        } else {
          const formBody = {
            firstname: firstName,
            lastname: lastName,
            address: address,
            info: info,
            lga: lga,
            state: state,
            tel: phoneNumber,
            tel2: phoneNumber2,
            userId: user.id,
            eventId: newEvent.id,
          };

          const res = await DeliveryDetailsApi(formBody);
          localStorage.setItem('delivery', JSON.stringify(res.data));
          setStep(step + 1);
        }
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)));
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

  const backAction = () => {
    setStep(3);
  };

  return (
    <>
      <Box h="100%" overflow="auto" mb="16" mt="10" w="80%" mx="auto">
        <Flex alignItems="start" justifyContent="space-between">
          <Box>
            <BackButton action={backAction} />
          </Box>

          <Box width="70%" mx="auto">
            <Box mb="10" w="500px">
              <Heading mb="2" fontWeight="semibold" fontSize="30px">
                Delivery Details
              </Heading>
              <Text color="#717171" fontSize={14}>
                Add the addresses you would like to receive your gifts
              </Text>
            </Box>

            <Box>
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
                      type="number"
                      w="100%"
                      maxLength={11}
                      min="0"
                      max="99999999999"
                      onInput={(e) => {
                        const maxLength = 11;
                        if (e.target.value.length > maxLength) {
                          e.target.value = e.target.value.slice(0, maxLength);
                        }
                      }}
                      value={phoneNumber}
                      onChange={e => setPhoneNumber(e.target.value)}
                    />
                  </Box>
                  <Box w={{ base: '100%', lg: '50%' }}>
                    <FormLabel fontSize={14}>Additional Phone Number</FormLabel>
                    <Input
                      type="number"
                      maxLength={11}
                      w="100%"
                      min="0"
                      max="99999999999"
                      onInput={(e) => {
                        const maxLength = 11;
                        if (e.target.value.length > maxLength) {
                          e.target.value = e.target.value.slice(0, maxLength);
                        }
                      }}
                      value={phoneNumber2}
                      onChange={e => setPhoneNumber2(e.target.value)}
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
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                    />
                  </Box>
                  <Box w="100%">
                    <FormLabel fontSize={14}>Additional Information</FormLabel>
                    <Input
                      type="text"
                      w="100%"
                      value={info}
                      onChange={e => setInfo(e.target.value)}
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
                      value={state}
                      onChange={e => setState(e.target.value)}
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
                      value={lga}
                      onChange={e => setLga(e.target.value)}
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
              </FormControl>
            </Box>
          </Box>
        </Flex>
      </Box>
      <FormFooter action={handleSubmit} step={step} />
    </>
  );
};

export default DeliveryDetailsForm;
