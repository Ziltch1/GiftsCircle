import React, {useState, useEffect} from 'react'
import GiftHeader from './subpages/GiftHeader'
import PurchaseHistory from './subpages/PurchaseHistory'
import {Box} from '@chakra-ui/react'
import GiftLists from './subpages/GiftLists'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const Index = ({ newEvent }) => {
  const eventId = newEvent[0]?.id;
  console.log(eventId);
  const [navPosition, setNavPosition] = useState(0)
  const [data, setData] = useState([]);
  const token = useSelector(state => state.auth.token);
  const api_url = `https://giftcircle-ws.onrender.com/api/gift/${eventId}`;
  // const api_url = `https://giftcircle-ws.onrender.com/images/giftItems/${eventId}`;



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
  }, [eventId]);

 

  return (
    <Box>
        <GiftHeader navPosition={navPosition} setNavPosition={setNavPosition} />
        <Box>
           {navPosition === 0 && <PurchaseHistory />}
           {navPosition === 1 && <GiftLists />}
        </Box>
    </Box>
  )
}

export default Index