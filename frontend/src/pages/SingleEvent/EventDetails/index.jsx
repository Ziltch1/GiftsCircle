import React, {useState, useEffect} from 'react';
import { Box } from '@chakra-ui/react';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts'
import Gifts from '../EventGifts'
import { useParams } from 'react-router-dom';
import { events } from '../../Events/data';
import { useSelector } from 'react-redux';
import axios from 'axios'


const Index = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [newEvent, setNewEvent] = useState([])

  const user = useSelector(state => state.auth.user);
  const token = useSelector(state => state.auth.token);
  const userId = user.id;
  const api_url = `https://giftcircle-ws.onrender.com/api/event/UserEvents/${userId}`;


  const getEvents = async () => {
    axios.get(api_url, {
      headers: {
        'Authorization': `token ${token}`
      }
    }).then((res) => {
      console.log(res.data)
      setData(res.data);
    }).catch((error) => {
      console.error(error)
    })
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    const specificEvent = data.filter((event) => event.id === id);
    console.log(specificEvent);
    setNewEvent(specificEvent);
  }, [data]);

  return (
    <Box>
      <Box>
        <EventSchedule newEvent={newEvent} />
        <EventHosts newEvent={newEvent} />
      </Box>
    </Box>
  );
};

export default Index;
