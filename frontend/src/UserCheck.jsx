import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Guest from './pages/Guest'
import Host from './pages/SingleEvent'
import { Box } from '@chakra-ui/react';
import { dispatch } from './redux/store';
import { GetUserEvents } from './redux/features/events/service';


const UserCheck = () => {
  const { id } = useParams();
  const { events, } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [newEvent, setNewEvent] = useState(null);

  let userId = user?.id;

  useEffect(() => {
    if (events?.length > 0) {
      const specificEvent = events.filter(event => event.id === id)[0];
      setNewEvent(specificEvent);
    } else {
      dispatch(GetUserEvents(userId));
    }
  }, [events, id, userId]);


  return (
    <Box>
        {newEvent?.user_id === userId ? <Host /> : <Guest />}
    </Box>
  )
}

export default UserCheck