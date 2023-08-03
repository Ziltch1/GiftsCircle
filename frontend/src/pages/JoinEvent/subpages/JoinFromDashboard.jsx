import { Box, Heading, Text, Input, Button, FormLabel, Spinner} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { JoinEventCoHostApi, JoinEventGuestApi } from '../../../redux/axios/apis/events';
import { useNavigate } from 'react-router-dom';
import { createResponse } from '../../../redux/utils/UtilSlice';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Response from '../../../components/ResponseToast';
import { dispatch } from '../../../redux/store';
import BackButton from '../../../components/Buttons/BackButton';
import JoinEventModal from './JoinEventModal';

const JoinFromDashboard = () => {
  const navigate = useNavigate();
  const [guestCode, setGuestCode] = useState('');
  const [coHostCode, setCoHostCode] = useState('')
  const [eventId, setEventId] = useState('');
  const [disableBtn, setDisabledBtn] = useState(true);
  const [showJoinEventModal, setShowJoinEventModal] = useState(true);
  const [guest, setGuest] = useState(false);
  const [coHost, setCoHost] = useState(false);
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (guestCode === '' || eventId === '') {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [guestCode, eventId, coHostCode]);

  useEffect(() => {
    if (coHostCode === '' || eventId === '') {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [eventId, coHostCode]);

  const handleClick = async () => {
    if (!disableBtn) {
      setLoading(true)
      let data = {
        eventId: eventId,
        userId: user.id,
        guestCode: guestCode,
        coHost: false,
      };
      try {
        await JoinEventGuestApi(data);
        navigate(`/dashboard/event_details/${eventId}`);
        setLoading(false)
      } catch (error) {
        console.log(ErrorHandler(error));
        dispatch(createResponse(ErrorHandler(error)));
        setLoading(false)
      }
    }
  };


  const handleCoHost = async () => {
    if (!disableBtn) {
      setLoading(true)
      let data = {
        eventId: eventId,
        userId: user.id,
        coHostCode: coHostCode,
        coHost: true,
      };
      try {
        await JoinEventCoHostApi(data);
        navigate(`/dashboard/event_details/${eventId}`);
        setLoading(false)
      } catch (error) {
        console.log(ErrorHandler(error));
        dispatch(createResponse(ErrorHandler(error)));
        setLoading(false)
      }
    }
  };


  return (
    <Box>
      <Header />
      <Response />
      {showJoinEventModal && 
        <JoinEventModal 
          setGuest={setGuest}
          setCoHost={setCoHost}
          showJoinEventModal={showJoinEventModal} 
          setShowJoinEventModal={setShowJoinEventModal} 
        />
      }
      <Box display="flex" alignItems="center" justifyContent="center" h="90vh">
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          w={{ base: '350px', md: '500px', lg: '500px' }}
          m="auto"
          h="auto"
        >
          {!showJoinEventModal && 
            <>
              <BackButton action={() => navigate('/dashboard')} />
              <Heading textAlign="center" mb="6" fontWeight="medium" fontSize={25}>
                Join new Event
              </Heading>
              <Box>
                {guest && <GuestView eventId={eventId} setEventId={setEventId} guestCode={guestCode} setGuestCode={setGuestCode} disableBtn={disableBtn} handleClick={handleClick} loading={loading} />}
                {coHost && <CoHostView eventId={eventId} setEventId={setEventId} coHostCode={coHostCode} setCoHostCode={setCoHostCode} disableBtn={disableBtn} handleClick={handleCoHost} loading={loading} />}
              </Box>
            </>
          }
        </Box>
      </Box>
    </Box>
  );
};

export default JoinFromDashboard;



export const GuestView = ({eventId, setEventId, guestCode, setGuestCode, disableBtn, handleClick, loading}) => {
  const HandleClick = async () => {
    await handleClick();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      HandleClick();
    }
  }


  return (
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
          onKeyDown={handleKeyPress}
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
          onKeyDown={handleKeyPress}
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
          onClick={HandleClick}
          disabled={disableBtn}
        >
          {loading ? <Spinner /> : 'Join now'}
        </Button>
      </Box>

    </Box>
  )
}



export const CoHostView = ({coHostCode, setCoHostCode, eventId, setEventId, handleClick, disableBtn, loading}) => {
  const HandleClick = async () => {
    await handleClick();
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      HandleClick();
    }
  }

  return (
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
          onKeyDown={handleKeyPress}
        />
      </Box>

      <Box mb="5">
        <FormLabel>Enter Co-host Code</FormLabel>
        <Input
          placeholder="Please enter the co-host code"
          bg="#F4F4F4"
          fontSize={14}
          _placeholder={{ color: '#A8A8A8' }}
          value={coHostCode}
          onChange={e => setCoHostCode(e.target.value)}
          onKeyDown={handleKeyPress}
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
          onClick={HandleClick}
          disabled={disableBtn}
        >
          {loading ? <Spinner /> : 'Join now'}
        </Button>
      </Box>

    </Box>
  )
}