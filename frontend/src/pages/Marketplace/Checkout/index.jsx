import { Box, Stack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader';
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm';
import CartSummary from './subpages/CartSummary';
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard';
import BackButton from '../../../components/Buttons/BackButton';
import { useSelector } from 'react-redux';

const Index = ({ setShowCheckout }) => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(true);
  const { deliveryDetails } = useSelector(state => state.user);

  const handleClick = () => {
    if (showDeliveryForm) {
      setShowDeliveryForm(false);
    } else {
      setShowCheckout(false);
    }
  };

  useEffect(() => {
    if (deliveryDetails) {
      if (deliveryDetails.length > 0) {
        setShowDeliveryForm(false);
      } else {
        setShowDeliveryForm(true);
      }
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
          {showDeliveryForm ? (
            <DeliveryDetailsForm setShowDeliveryForm={setShowDeliveryForm} />
          ) : (
            <DeliveryDetailsCard
              data={deliveryDetails}
              setShowDeliveryForm={setShowDeliveryForm}
            />
          )}
        </Box>

        <Box w={{ base: '100%', lg: '30%' }}>
          <CartSummary />
        </Box>
      </Stack>
    </Box>
  );
};

export default Index;
