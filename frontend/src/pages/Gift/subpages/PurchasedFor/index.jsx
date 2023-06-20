import { Box, } from '@chakra-ui/react';
import React, {useContext} from 'react';
import PurchasedFor from './subpages/PurchasedFor';
import { SearchContext } from '../..';

const Index = ({ events }) => {
  const [filtered] = useContext(SearchContext);
  console.log(filtered);
  return (
    <Box>
      <PurchasedFor events={filtered} />
    </Box>
  );
};

export default Index;
