import React, {useEffect, useState} from 'react';
import { Box } from '@chakra-ui/react';
import EventSchedule from './SubPages/EventSchedule';
import EventHosts from './SubPages/EventHosts';
import { GetEventDeliveryDetailsApi } from '../../../redux/axios/apis/delivery';

const Index = ({ newEvent, isCoHost }) => {
  const [deliveryAddress, setDeliveryAddress] = useState([]);

  const getDeliveryAddress = async () => {
    try {
      const res = await GetEventDeliveryDetailsApi(newEvent.id);
      const data = await res.data;
      setDeliveryAddress(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeliveryAddress();
  }, [newEvent.id]);

  return (
    <Box>
      <Box>
        <EventSchedule newEvent={newEvent} deliveryAddress={deliveryAddress} isCoHost={isCoHost} getDeliveryAddress={getDeliveryAddress} />
        <EventHosts newEvent={newEvent} />
      </Box>
    </Box>
  );
};

export default Index;
