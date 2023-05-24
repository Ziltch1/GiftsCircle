import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import FundraisingCard from './FundraisingCard';
import DonationHistory from './DonationHistory';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../../redux/store';
import { GetEventFundRaisingDonors } from '../../../../redux/features/events/service';

const Index = ({ event }) => {
  const { fundRaising } = useSelector(state => state.event);

  useEffect(() => {
    if (fundRaising) {
      dispatch(GetEventFundRaisingDonors(fundRaising.id));
    }
  }, [fundRaising]);

  return (
    <Box>
      <FundraisingCard event={event} />
      {/* <DonationHistory /> */}
    </Box>
  );
};

export default Index;
