import React, { useState, useEffect, createContext } from 'react';
import EventImages from './subpages/EventImages';
import Tabs from './Tabs';
import EventDetails from './subpages/EventDetails';
import EventGifts from './subpages/EventGifts';
import { Box, Skeleton, Stack } from '@chakra-ui/react';
import EventMedia from './subpages/EventMedia';
import { useParams, useNavigate } from 'react-router-dom';
import {
  GetAsoebiItems,
  GetEventAsoebis,
  GetEventDeliveryDetails,
  GetEventFundRaising,
  GetEventGifts,
  GetEventMediaFiles,
  GetUserUploadedFiles,
} from '../../redux/features/events/service';
import { dispatch } from '../../redux/store';
import BackButton from '../../components/Buttons/BackButton';
import { GetEventApi } from '../../redux/axios/apis/events';
import {
  GetComplimentaryGiftItems,
  GetGiftItems,
} from '../../redux/features/gift/service';
import Fundraising from './subpages/Fundraising';
import Asoebi from './subpages/Asoebi';
import { setNewEvent } from '../../redux/features/events/eventSlice';
import { useSelector } from 'react-redux';
import Checkout from './subpages/EventGifts/Checkout'

export const CheckoutContext = createContext(null);

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [navPosition, setNavPosition] = useState(0);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutAmount, setCheckoutAmount] = useState(0);
  const [cartLength, setCartLength] = useState('');
  const [deliveryFee, setDeliveryFee] = useState(0);

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
      dispatch(setNewEvent(res.data));
      setEvent(res.data);
    };
    GetEvent();
    dispatch(GetEventGifts(id));
    dispatch(GetUserUploadedFiles(id, user.id));
    dispatch(GetEventMediaFiles(id));
    dispatch(GetEventDeliveryDetails(id));
    dispatch(GetEventAsoebis(id));
    dispatch(GetEventFundRaising(id));
    dispatch(GetAsoebiItems());
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
      <Box w="76%" mx="auto" pt="8" pb="7">
        {loading ? (
          <Stack spacing="20px">
            <Skeleton height="50px" width="100%" />
            <Skeleton height="50px" width="75%" />
            <Skeleton height="50px" width="50%" />
          </Stack>
        ) : (
          <CheckoutContext.Provider
            value={{checkoutAmount, setCheckoutAmount, cartLength, setCartLength, deliveryFee, setDeliveryFee}}
          >
            {showCheckout ? 
              <Checkout setShowCheckout={setShowCheckout} /> 
              :
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
                    {navPosition === 1 && <EventGifts event={event} setShowCheckout={setShowCheckout} />}
                    {navPosition === 2 && <EventMedia />}
                    {navPosition === 3 && <Asoebi event={event} />}
                    {navPosition === 4 && <Fundraising event={event} />}
                  </Box>
              </>
            }
          </CheckoutContext.Provider>
        )}
      </Box>
    </Box>
  );
};

export default Index;
