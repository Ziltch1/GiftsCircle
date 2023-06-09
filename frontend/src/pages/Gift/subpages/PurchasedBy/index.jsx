import { Box } from '@chakra-ui/react';
import React from 'react';
import PurchasedBy from './subpages/PurchasedBy';

const Index = ({ events }) => {
  return (
    <Box>
      <PurchasedBy events={events} />
    </Box>
  );
};

export default Index;
