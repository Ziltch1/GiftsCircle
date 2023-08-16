import React, {useState, useEffect} from 'react'
import { Box, Button, Stack } from '@chakra-ui/react'
import GuestList from './subpages/GuestList'
import CoHostList from './subpages/CoHostList'
import { GetCoHostGuestsApi, GetEventCohostsApi } from '../../../redux/axios/apis/events'
import { useSelector } from 'react-redux'


const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  const [coHost, setCoHost] = useState([]);
  const [eventGuests, setEventGuests] = useState([]);
  const {newEvent} = useSelector(state => state.event)
  const {user} = useSelector(state => state.user)

  const getEventCohost = async () => {
    try {
      const res = await GetEventCohostsApi(newEvent.id);
      const data = res.data;
      setCoHost(data);
    } catch (error) {
      console.log(error);
    }
  }

  const getCoHostGuests = async () => {
    try {
      const res = await GetCoHostGuestsApi(newEvent?.id, user?.id);
      const data = await res.data;
      console.log(data);
      setEventGuests(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventCohost();
    getCoHostGuests();
  }, [newEvent]);
  return (
    <Box minH='400px'>
      <Tabs position={navPosition} setNavPosition={setNavPosition} />
      {navPosition === 0 && <GuestList eventGuests={eventGuests} />}
      {navPosition === 1 && <CoHostList data={coHost} />}
    </Box>
  )
}

export default Index


export const Tabs = ({position, setNavPosition}) => {
  const options = ['Guests', 'Co-Hosts']
  const handleClick = (index) => {
    setNavPosition(index)
  }
  return (
    <Box mb='7'>
      <Stack direction='row' spacing={4}>
      {options.map((option, index) => (
      <Button 
          borderRadius={100}
          fontSize={14}
          bg="none"
          onClick={() => handleClick(index)}
          style={
            index === position
              ? {
                backgroundColor: '#CCF2F0',
                padding: '8px 15px',
                borderRadius: '100px',
                color: '#009F94',
              }
              : { fontWeight: 'normal' }
          }
        >
        {option}
      </Button>))}
      </Stack>
    </Box>
  )
}