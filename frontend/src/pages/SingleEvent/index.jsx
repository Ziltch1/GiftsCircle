import React, { useState, useEffect } from 'react';
import EventImages from './EventImages';
import Tabs from './Tabs';
import EventDetails from './EventDetails';
import EventGifts from './EventGifts';
import EventGuests from './EventGuests';
import Asoebi from './Asoebi';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import EventMedia from './EventMedia';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  GetEventFundRaising,
  GetEventFundRaisingDonors,
  GetEventMediaFiles,
  GetHostRecievedFiles,
  GetUserEvents,
} from '../../redux/features/events/service';
import { dispatch } from '../../redux/store';
import BackButton from '../../components/Buttons/BackButton';
import Header from '../../components/Header/Header';
import Fundraising from './Fundraising';
import {
  setFundRaising,
  setNewEvent,
} from '../../redux/features/events/eventSlice';

const Index = () => {
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0);
  const { id } = useParams();
  const [newEvent, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { events, fundRaising } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);

  let userId = user.id;

  useEffect(() => {
    if (events.length > 0) {
      const specificEvent = events.filter(event => event.id === id)[0];
      setEvent(specificEvent);
      dispatch(setNewEvent(specificEvent));
    } else {
      dispatch(GetUserEvents(userId));
    }
  }, [events, id, userId]);

  useEffect(() => {
    if (newEvent) {
      dispatch(GetEventFundRaising(newEvent.id));
      dispatch(GetEventMediaFiles(newEvent.id));
      dispatch(GetHostRecievedFiles(newEvent.id));
      setLoading(false);
    }
  }, [newEvent]);

  useEffect(() => {
    if (fundRaising && newEvent) {
      if (fundRaising.eventId !== newEvent.id) {
        dispatch(setFundRaising(null));
      }
      dispatch(GetEventFundRaisingDonors(fundRaising.id));
    }
  }, [fundRaising, newEvent]);

  return (
    <Box bg="#F5F5F5">
      <Header />
      <Box w="76%" mx="auto" pt="8" pb="7">
        {loading ? (
          <Stack spacing="20px">
            <Skeleton height="50px" width="100%" />
            <Skeleton height="50px" width="75%" />
            <Skeleton height="50px" width="50%" />
          </Stack>
        ) : (
          <>
            <Box>
              <BackButton action={() => navigate(-1)} />
              <EventImages newEvent={newEvent} />
            </Box>
            <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
            <Box>
              {navPosition === 0 && <EventDetails newEvent={newEvent} />}
              {navPosition === 1 && <EventGifts newEvent={newEvent} />}
              {navPosition === 2 && <EventMedia />}
              {navPosition === 3 && <EventGuests />}
              {navPosition === 4 && <Asoebi newEvent={newEvent} />}
              {navPosition === 5 && <Fundraising />}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;
