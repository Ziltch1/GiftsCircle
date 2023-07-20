import { Box, Stack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader';
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm';
import CartSummary from './subpages/CartSummary';
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard';
import BackButton from '../../../../../components/Buttons/BackButton'
import { useSelector } from 'react-redux';
import { Zones } from '../../../../../Utils/data/ZONES';

const Index = ({ setShowCheckout, setShowAsoebiCheckout, amount, showAsoebiDrawer, buyAsoebi, cartLength }) => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(true);
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [deliveryPercent, setDeliveryPercent] = useState(0);
  const { deliveryDetails } = useSelector(state => state.user);
  const { checkoutData } = useSelector(state => state.market);

  const handleClick = () => {
    setShowAsoebiCheckout(false);
  };

  const HandleSubmit = async () => {
    await buyAsoebi();
    showAsoebiDrawer(false);
    setShowAsoebiCheckout(false);
  }

  useEffect(() => {
    if (deliveryDetails) {
      if (deliveryDetails.length > 0) {
        setShowDeliveryForm(false);
      } else {
        setShowDeliveryForm(true);
      }
    }
  }, [deliveryDetails]);

  useEffect(() => {
    if (selectedDeliveryDetails) {
      Object.keys(Zones).forEach(val => {
        const states = Object.keys(Zones[val]);
        if (states.includes(selectedDeliveryDetails.state)) {
          const amount = Zones[val][selectedDeliveryDetails.state];
          setDeliveryPercent(amount);
        }
      });
    }
  }, [selectedDeliveryDetails]);

  useEffect(() => {
    if (deliveryPercent !== 0) {
      const fee = amount * (deliveryPercent / 100);
      setDeliveryAmount(fee);
    }
  }, [deliveryPercent]);

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
            <DeliveryDetailsForm
              setShowDeliveryForm={setShowDeliveryForm}
              selectedDeliveryDetails={selectedDeliveryDetails}
              setSelectedDeliveryDetails={setSelectedDeliveryDetails}
            />
          ) : (
            <DeliveryDetailsCard
              data={deliveryDetails}
              setShowDeliveryForm={setShowDeliveryForm}
              setSelectedDeliveryDetails={setSelectedDeliveryDetails}
            />
          )}
        </Box>

        <Box w={{ base: '100%', lg: '30%' }}>
          <CartSummary
            amount={amount}
            cartLength={cartLength}
            deliveryAmount={deliveryAmount}
            handleSubmit={HandleSubmit}
          />
        </Box>
      </Stack>
    </Box>
  );
};

export default Index;
