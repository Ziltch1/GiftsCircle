import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Guest from '../Guest';
import Host from '.';
import { Box } from '@chakra-ui/react';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import Response from '../../components/ResponseToast';

const UserCheck = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { events } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [newEvent, setNewEvent] = useState(null);
  const [activeUser, setActiveUser] = useState(false)

  let userId = user?.id;

  useEffect(() => {
    if (user?.id) {
      setActiveUser(true)
    } else {
      setActiveUser(false)
      navigate('/signin')
    }
  }, [user])

  useEffect(() => {
    if (events?.length > 0) {
      const specificEvent = events.filter(event => event.id === id)[0];
      setNewEvent(specificEvent);
    } else {
      dispatch(GetUserEvents(userId));
    }
  }, [events, id, userId]);


  return (
    <>
      <Response />
      <Box>
        {activeUser && 
          <>
            <Box>{newEvent?.user_id === userId ? <Host /> : <Guest />}</Box>
          </>
        }
      </Box>
    </>
  );
};

export default UserCheck;
