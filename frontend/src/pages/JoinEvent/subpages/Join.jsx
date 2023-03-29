import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import {
  signInWithPopup,
  auth,
  provider,
} from '../../../redux/axios/Utils/Firebase';
import React, { useState } from 'react';
import { GoogleSignInApi } from '../../../redux/axios/apis/auth';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { JoinEventGuestApi } from '../../../redux/axios/apis/events';

const Join = ({ event, user }) => {
  const [guestCode, setGuestCode] = useState('');
  const toast = useToast();

  const data = {
    eventId: event.id,
    userId: user.id,
    guestCode: localStorage.getItem('guestCode'),
    coHost: false,
  };

  const GoogleSignInHandler = async () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        const formBody = {
          email: result.user.email,
        };

        const res = await GoogleSignInApi(formBody);
        if (res.data) {
          const res = await JoinEventGuestApi(data);
          console.log(res.data);
        }
      })
      .catch(error => {
        console.log(error);
        console.log(ErrorHandler(error));
      });
  };

  const handleClick = () => {
    if (guestCode === '') {
      toast({
        title: 'Error!',
        description: 'Please enter a guest code',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      localStorage.setItem('guestCode', guestCode);
      GoogleSignInHandler();
    }
  };
  return (
    <Box w={{ base: '350px', md: '500px', lg: '500px' }} mx="auto" h="auto">
      <Heading textAlign="center" mb="6" fontWeight="medium" fontSize={25}>
        Join {`${user.firstname}'s`} Event
      </Heading>
      <FormControl>
        <Box mb="5">
          <FormLabel>Enter Guest Code</FormLabel>
          <Input
            placeholder="Please enter the guest code"
            bg="#F4F4F4"
            fontSize={14}
            _placeholder={{ color: '#A8A8A8' }}
            value={guestCode}
            onChange={e => setGuestCode(e.target.value)}
          />
        </Box>
        <Text fontSize={14} mb="5" fontWeight="medium">
          By clicking "Join", you agree to our Terms of Services and Privacy
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
            Join now
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default Join;
