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
  GetEventGuests,
  GetGuestSentFiles,
  GetUserEvents,
  GetUserUploadedFiles,
} from '../../redux/features/events/service';
import { dispatch } from '../../redux/store';
import BackButton from '../../components/Buttons/BackButton';
import Fundraising from './Fundraising';
import {
  setFundRaising,
  setNewEvent,
} from '../../redux/features/events/eventSlice';
import {
  GetComplimentaryGiftItems,
  GetEventGiftsTransactions,
  GetGiftItems,
} from '../../redux/features/gift/service';

const Index = () => {
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0);
  const { id } = useParams();
  const [newEvent, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { events, fundRaising, eventGuests } = useSelector(
    state => state.event
  );
  const { user } = useSelector(state => state.user);

  let userId = user?.id;

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
      if (newEvent.published) {
        dispatch(GetGiftItems());
        dispatch(GetComplimentaryGiftItems());
        dispatch(GetEventGuests(newEvent.id));
        dispatch(GetEventFundRaising(newEvent.id));
        dispatch(GetUserUploadedFiles(newEvent.id, user.id));
        dispatch(GetGuestSentFiles(newEvent.id));
        // dispatch(GetEventAsoebiBuyers(newEvent.id));
        dispatch(GetEventGiftsTransactions(newEvent.id));
        setLoading(false);
      } else {
        dispatch(GetEventGuests(newEvent.id));
        dispatch(GetGiftItems());
        dispatch(GetComplimentaryGiftItems());
        setLoading(false);
      }
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

  useEffect(() => {
    if (user && newEvent) {
      console.log(user)
      dispatch(GetUserUploadedFiles(newEvent.id, user.id));
    }
  }, [user, newEvent]);

  return (
    <Box bg="#F5F5F5">
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
              <EventImages newEvent={newEvent} eventGuests={eventGuests} />
            </Box>
            <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />

            {newEvent.published ? (
              <Box>
                {navPosition === 0 && <EventDetails newEvent={newEvent} />}
                {navPosition === 1 && <EventGifts newEvent={newEvent} />}
                {navPosition === 2 && <EventMedia />}
                {navPosition === 3 && <EventGuests />}
                {navPosition === 4 && <Asoebi newEvent={newEvent} />}
                {navPosition === 5 && <Fundraising />}
              </Box>
            ) : (
              <Box>
                {navPosition === 0 && <EventDetails newEvent={newEvent} />}
                {navPosition === 1 && <EventGifts newEvent={newEvent} />}
                {navPosition === 2 && <Asoebi newEvent={newEvent} />}
                {navPosition === 3 && <Fundraising />}
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;
