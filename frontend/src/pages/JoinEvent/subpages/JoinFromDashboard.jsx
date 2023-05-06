import { Box, Heading, Text, Input, Button, FormLabel } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { JoinEventGuestApi } from '../../../redux/axios/apis/events';
import { useNavigate } from 'react-router-dom';
import { createResponse } from '../../../redux/utils/UtilSlice';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Response from '../../../components/ResponseToast';
import { dispatch } from '../../../redux/store';
import BackButton from '../../../components/Buttons/BackButton';

const JoinFromDashboard = () => {
  const navigate = useNavigate();
  const [guestCode, setGuestCode] = useState('');
  const [eventId, setEventId] = useState('');
  const [disableBtn, setDisabledBtn] = useState(true);

  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (guestCode === '' || eventId === '') {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [guestCode, eventId]);

  const handleClick = async () => {
    if (!disableBtn) {
      let data = {
        eventId: eventId,
        userId: user.id,
        guestCode: guestCode,
        coHost: false,
      };
      try {
        await JoinEventGuestApi(data);
        navigate(`/view_event/${eventId}`);
      } catch (error) {
        console.log(ErrorHandler(error));
        dispatch(createResponse(ErrorHandler(error)));
      }
    }
  };

  return (
    <Box>
      <Header />
      <Response />
      <Box display="flex" alignItems="center" justifyContent="center" h="90vh">
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          w={{ base: '350px', md: '500px', lg: '500px' }}
          m="auto"
          h="auto"
        >
          <BackButton action={() => navigate('/dashboard')} />
          <Heading textAlign="center" mb="6" fontWeight="medium" fontSize={25}>
            Join new Event
          </Heading>

          <Box display="flex" flexDirection="column" gap="12px">
            <Box mb="5">
              <FormLabel>Enter Event ID</FormLabel>
              <Input
                placeholder="Please enter the event code"
                bg="#F4F4F4"
                fontSize={14}
                _placeholder={{ color: '#A8A8A8' }}
                value={eventId}
                onChange={e => setEventId(e.target.value)}
              />
            </Box>

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
                opacity={!disableBtn ? '1.0' : '0.5'}
                w="100%"
                bg="#00BFB2"
                fontWeight="medium"
                fontSize={14}
                color="white"
                onClick={handleClick}
                disabled={disableBtn}
              >
                Join now
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinFromDashboard;
