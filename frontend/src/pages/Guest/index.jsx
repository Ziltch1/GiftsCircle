import React, { useState, useEffect } from 'react';
import EventImages from './subpages/EventImages';
import Tabs from './Tabs';
import EventDetails from './subpages/EventDetails';
import EventGifts from './subpages/EventGifts';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import EventMedia from './subpages/EventMedia';
import { useParams, useNavigate } from 'react-router-dom';
import { GetEventGifts } from '../../redux/features/events/service';
import { dispatch } from '../../redux/store';
import BackButton from '../../components/Buttons/BackButton';
import Header from '../../components/Header/Header';
import { GetEventApi } from '../../redux/axios/apis/events';
import {
  GetComplimentaryGiftItems,
  GetGiftItems,
} from '../../redux/features/gift/service';
import Fundraising from './subpages/Fundraising';

const Index = () => {
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let check = localStorage.getItem('Cart');
    if (!check) {
      localStorage.setItem(
        'Cart',
        JSON.stringify({
          giftItems: [],
        })
      );
    }
  }, []);

  useEffect(() => {
    const GetEvent = async () => {
      const res = await GetEventApi(id);
      setEvent(res.data);
    };
    GetEvent();
    dispatch(GetEventGifts(id));
    dispatch(GetGiftItems());
    dispatch(GetComplimentaryGiftItems());
  }, [id]);

  useEffect(() => {
    if (event) {
      setLoading(false);
    }
  }, [event]);

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
              <BackButton action={() => navigate('/dashboard')} />
              <EventImages newEvent={event} />
            </Box>
            <Tabs
              navPosition={navPosition}
              setNavPosition={setNavPosition}
              event={event}
            />
            <Box>
              {navPosition === 0 && <EventDetails newEvent={event} />}
              {navPosition === 1 && <EventGifts event={event} />}
              {navPosition === 2 && <EventMedia />}
              {navPosition === 3 && <Fundraising event={event} />}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Index;
