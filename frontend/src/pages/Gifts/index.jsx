import { Box, Stack, Skeleton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import Search from '../../components/Search/Search'
import GiftHeader from '../Gift/GiftHeader'
import PurchasedBy from './PurchasedBy'
// import PurchasedFor from './PurchasedFor/PurchasedFor'
import PurchasedFor from './PurchasedFor'
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetUserEvents } from "../../redux/features/events/service";
import { dispatch } from "../../redux/store";
import { GetGiftItems } from '../../redux/features/gift/service'
import GiftTabs from './GiftTabs'


const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  const [loading, setLoading] = useState(true);
  const { events, eventGifts } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      dispatch(GetUserEvents(user.id));
      dispatch(GetGiftItems());
      setLoading(false)
    }
  }, [user]);

  return (
    <Box w='100%' bg='#f5f5f5' h='100%' pb='5'>
      <GiftHeader />
      <GiftTabs navPosition={navPosition} setNavPosition={setNavPosition} />
      <Search />
      {loading ? (
        <Stack spacing="20px">
          <Skeleton height="50px" width="100%" />
          <Skeleton height="50px" width="75%" />
          <Skeleton height="50px" width="50%" />
        </Stack>) : (
        <>
          <Box w='100%' mx='auto'>
            {navPosition === 0 && <PurchasedFor events={events} />}
            {navPosition === 1 && <PurchasedBy events={events} />}
          </Box>
        </>)}
    </Box>
  )
}

export default Index