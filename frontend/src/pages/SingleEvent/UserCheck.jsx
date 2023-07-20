import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Guest from '../Guest';
import Host from '.';
import { Box } from '@chakra-ui/react';
import { dispatch } from '../../redux/store';
import { GetUserEvents } from '../../redux/features/events/service';
import Response from '../../components/ResponseToast';
import { GetEventCohostsApi } from '../../redux/axios/apis/events';


const UserCheck = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { events } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [newEvent, setNewEvent] = useState(null);
  const [activeUser, setActiveUser] = useState(false);
  const [coHost, setCoHost] = useState('');
  const [isCoHost, setIsCoHost] = useState(false);

  let userId = user?.id;

  useEffect(() => {
    if (user?.id) {
      setActiveUser(true)
    } else {
      setActiveUser(false)
      navigate('/signin')
    }
  }, [user]);

  const getEventCohosts = async () => {
    try {
      const res = await GetEventCohostsApi(id);
      const data = await res.data;
      setCoHost(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (events?.length > 0) {
      const specificEvent = events.filter(event => event.id === id)[0];
      setNewEvent(specificEvent);
      getEventCohosts();
    } else {
      dispatch(GetUserEvents(userId));
    }
  }, [events, id, userId]);

  useEffect(() => {
    if (coHost?.length > 0) {
      coHost.map((item) => {
        if (item?.userId === user.id) {
          setIsCoHost(true)
          console.log(item?.userId === userId);
        }
      })
    }
  }, [coHost, userId])

  console.log(coHost);


  return (
    <>
      <Response />
      <Box>
        {activeUser && 
          <>
            <Box>
              {newEvent?.user_id === userId || isCoHost
              ? 
              <Host isCoHost={isCoHost} /> 
              : 
              <Guest />
              }
            </Box>
          </>
        }
      </Box>
    </>
  );
};

export default UserCheck;
