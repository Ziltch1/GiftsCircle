import React, {useState, useEffect} from 'react';
import { Box } from '@chakra-ui/react';
// import EventImages from './SubPages/EventImages';
// import Tabs from './SubPages/Tabs';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts'
import Gifts from '../EventGifts'
import { useParams } from 'react-router-dom';
import { events } from '../../Events/data';

const Index = () => {

  const {id} = useParams();
  const [newEvent, setNewEvent] = useState([]);

  useEffect(() => {
    const specificEvent = newEvent.find((event) => event.id === parseInt(id));
    setNewEvent(specificEvent);
  }, [])

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
