import React, {useState, useEffect} from 'react'
import EventImages from './EventImages'
import Tabs from './Tabs'
import EventDetails from './EventDetails'
import EventGifts from './EventGifts'
import {Box} from '@chakra-ui/react'
import Header from '../../components/Header/Header'
import EventMedia from './EventMedia'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Index = () => {

  const [navPosition, setNavPosition] = useState(0);
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

  console.log(newEvent);

  return (
    <Box bg='#F5F5F5' h='100%'>
          <Header />
          <Box w="76%" mx="auto" pt="8" pb='7'>
              <EventImages newEvent={newEvent} />
              <Tabs navPosition={navPosition} setNavPosition={setNavPosition} />
              <Box>
                  {navPosition === 0 && <EventDetails /> }
                  {navPosition === 1 && <EventGifts /> }
                  {navPosition === 2 && <EventMedia /> }
              </Box>
          </Box>
    </Box>
     
  )
}

export default Index