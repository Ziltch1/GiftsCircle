import { Box, Stack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader';
import DeliveryDetailsFooter from './subpages/DeliveryDetailsFooter';
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm';
import CartSummary from './subpages/CartSummary';
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard';
import BackButton from '../../../components/Buttons/BackButton';
import { useSelector } from 'react-redux';
import { dispatch } from '../../../redux/store';
import { GetDeliveryDetails } from '../../../redux/features/user/service';

const Index = ({ setShowCheckout }) => {
  const [deliveryData, setDeliveryData] = useState([]);
  const { user, deliveryDetails } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(GetDeliveryDetails(user.id));
  }, []);
  const handleClick = () => {
    setShowCheckout(false);
  };

  useEffect(() => {
    if (deliveryDetails) {
      setDeliveryData(deliveryDetails);
    }
  }, [deliveryDetails]);

  return (
    <Box w="80%" mx="auto" my="8">
      <BackButton action={handleClick} />
      <Stack
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        justifyContent="space-between"
        mt="5"
      >
        <Box bg="white" w={{ base: '100%', lg: '65%' }} borderRadius={5} p="4">
          <DeliveryDetailsHeader />
          <Divider />
          {!deliveryDetails ? <DeliveryDetailsCard /> : <DeliveryDetailsForm />}
          {/* <Divider /> */}
          <DeliveryDetailsFooter />
        </Box>

        <Box w={{ base: '100%', lg: '30%' }}>
          <CartSummary />
        </Box>
      </Stack>
    </Box>
  );
};

export default Index;
