import {
  Box,
  Flex,
  Text,
  Heading,
  Input,
  FormControl,
  FormLabel,
  useToast,
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
} from '../../../../redux/axios/apis/user';
import { setDeliveryDetails } from '../../../../redux/features/user/userSlice';
import { GetDeliveryDetails } from '../../../../redux/features/user/service';

const DeliveryDetailsForm = ({ step, setStep }) => {
  const { user, deliveryDetails } = useSelector(state => state.user);
  const toast = useToast();
  const [address, setAddress] = useState(
    deliveryDetails[0] ? deliveryDetails[0].address : ''
  );
  const [city, setCity] = useState(
    deliveryDetails[0] ? deliveryDetails[0].city : ''
  );
  const [state, setState] = useState(
    deliveryDetails[0] ? deliveryDetails[0].state : ''
  );
  const [country, setCountry] = useState(
    deliveryDetails[0] ? deliveryDetails[0].country : ''
  );
  const [postalCode, setPostalCode] = useState(
    deliveryDetails[0] ? deliveryDetails[0].postalCode : ''
  );
  const [phoneNumber1, setPhoneNumber1] = useState(
    deliveryDetails[0] ? deliveryDetails[0].tel : ''
  );
  const [phoneNumber2, setPhoneNumber2] = useState(
    deliveryDetails[0] ? deliveryDetails[0].tel2 : ''
  );

  useEffect(() => {
    const Delivery = JSON.parse(localStorage.getItem('delivery'));
    if (Delivery) {
      dispatch(setDeliveryDetails(Delivery));
    } else {
      dispatch(GetDeliveryDetails(user.id));
    }
  }, []);

  const handleSubmit = async () => {
    const formBody = {
      address: address,
      city: city,
      state: state,
      tel: phoneNumber1,
      tel2: phoneNumber2,
      userId: user.id,
      postalCode: postalCode,
      country: country,
    };

    if (address && city && state && country && postalCode && phoneNumber1) {
      try {
        if (deliveryDetails.length > 0) {
          const res = await UpdateDeliveryDetailsApi(
            formBody,
            deliveryDetails[0].id
          );
          localStorage.setItem('delivery', JSON.stringify(res.data));
          setStep(step + 1);
        } else {
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
      <Box h="100%" overflow="auto" mb="16" mt="10" w="750px" mx="auto">
        <Flex alignItems="start" justifyContent="space-between">
          <Box>
            <BackButton action={backAction} />
          </Box>

          <Box w="500px" mx="auto">
            <Box mb="10">
              <Heading mb="2" fontWeight="semibold" fontSize="30px">
                Delivery Details
              </Heading>
              <Text color="#717171" fontSize={14}>
                Add the addresses you would like to receive your gifts
              </Text>
            </Box>

            <Box>
              <FormControl isRequired>
                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    Address
                  </FormLabel>
                  <Input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </Box>

                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    City
                  </FormLabel>
                  <Input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </Box>

                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    State
                  </FormLabel>
                  <Input
                    type="text"
                    value={state}
                    onChange={e => setState(e.target.value)}
                  />
                </Box>

                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    Country
                  </FormLabel>
                  <Input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                  />
                </Box>

                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    Postal Code
                  </FormLabel>
                  <Input
                    type="text"
                    value={postalCode}
                    onChange={e => setPostalCode(e.target.value)}
                  />
                </Box>

                <Box mb="6">
                  <FormLabel fontWeight="semibold" fontSize={15}>
                    Phone Number 1
                  </FormLabel>
                  <Input
                    type="text"
                    value={phoneNumber1}
                    onChange={e => setPhoneNumber1(e.target.value)}
                  />
                </Box>
              </FormControl>
              <Box mb="6">
                <FormLabel fontWeight="semibold" fontSize={15}>
                  Phone Number 2
                </FormLabel>
                <Input
                  type="text"
                  value={phoneNumber2}
                  onChange={e => setPhoneNumber2(e.target.value)}
                />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
      <FormFooter action={handleSubmit} step={step} />
    </>
  );
};

export default DeliveryDetailsForm;
