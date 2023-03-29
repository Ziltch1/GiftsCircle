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
import React, { useState, useEffect } from 'react';
import { GoogleSignInApi } from '../../../redux/axios/apis/auth';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { JoinEventGuestApi } from '../../../redux/axios/apis/events';
import { CreateUserApi } from '../../../redux/axios/apis/user';
import { useNavigate } from 'react-router-dom';
import { createResponse } from '../../../redux/utils/UtilSlice';
import { dispatch } from '../../../redux/store';
import { GuestSignIn } from '../../../redux/features/auth/services';
import { useSelector } from 'react-redux';

const Join = ({ event, user }) => {
  const navigate = useNavigate();
  const [guestCode, setGuestCode] = useState('');
  const [guestId, setGuestId] = useState('');
  const toast = useToast();
  const { token } = useSelector(state => state.auth);

  const GoogleSignInHandler = async () => {
    signInWithPopup(auth, provider)
      .then(async result => {
        const formBody = {
          email: result.user.email,
        };

        const res = await GoogleSignInApi(formBody);

        if (res.data) {
          setGuestId(res.data.user.id);
          dispatch(GuestSignIn(res.data));
        } else {
          const formBody = {
            firstname: result.user.displayName?.split(' ')[1],
            lastname: result.user.displayName?.split(' ')[0],
            email: result.user.email,
          };

          const res = await CreateUserApi(formBody);
          console.log(res.data);
        }
      })
      .catch(error => {
        console.log(error);
        createResponse(ErrorHandler(error));
      });
  };

  useEffect(() => {
    if (token) {
      let data = {
        eventId: event.id,
        userId: guestId,
        guestCode: guestCode,
        coHost: false,
      };
      const AddGuest = async () => {
        await JoinEventGuestApi(data);
        navigate(`/view_event`);
      };

      AddGuest();
    }
  }, [token]);

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
