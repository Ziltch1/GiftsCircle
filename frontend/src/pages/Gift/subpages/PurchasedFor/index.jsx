import { Box } from '@chakra-ui/react';
import React from 'react';
import PurchasedFor from './subpages/PurchasedFor';

const Index = ({ events }) => {

  return (
    <Box>
      <PurchasedFor events={events} />
    </Box>
  );
};

export default Index;
