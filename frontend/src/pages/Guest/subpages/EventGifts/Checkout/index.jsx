import { Box, Stack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader';
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm';
import CartSummary from './subpages/CartSummary';
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard';
import { useSelector } from 'react-redux';
import BackButton from '../../../../../components/Buttons/BackButton';
import { Zones } from '../../../../../Utils/data/ZONES';
import { DeliveryDetailsApi, GetDeliveryDetailsApi } from '../../../../../redux/axios/apis/delivery';


const Index = ({ setShowCheckout, giftDetails, checkContribution }) => {
  const [showDeliveryForm, setShowDeliveryForm] = useState(true);
  const [selectedDeliveryDetails, setSelectedDeliveryDetails] = useState(null);
  const [deliveryAmount, setDeliveryAmount] = useState(0);
  const [deliveryPercent, setDeliveryPercent] = useState(0);
  const [deliveryDetails, setDeliveryDetails] = useState([])
  const { checkoutData } = useSelector(state => state.market);
  const {newEvent} = useSelector(state => state.event)

  console.log(checkContribution);

  const { amount, data } = checkoutData;

  const getDeliveryDetails = async() => {
    try {
      const res = await GetDeliveryDetailsApi(newEvent?.user_id);
      const data = await res.data;
      setDeliveryDetails(data)
    } catch (error) {
      
    }
  }

  console.log(deliveryDetails);

  const handleClick = () => {
    setShowCheckout(false)
    if (showDeliveryForm) {
      setShowDeliveryForm(false);
    }
     else {
      setShowCheckout(false);
    }
  };

  useEffect(() => {
    getDeliveryDetails();
  }, []);

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
    <Box w="80%" mx="auto" my="8" h='100vh'>
      <BackButton action={handleClick} />
      <Stack
        direction={{ base: 'column', md: 'row', lg: 'row' }}
        justifyContent="space-between"
        mt="5"
      >
          <Box w={{ base: '100%', lg: '80%' }} mx='auto'>
            <CartSummary
              amount={amount}
              data={data}
              deliveryAmount={deliveryAmount}
              setShowCheckout={setShowCheckout}
              giftDetails={giftDetails}
            />
          </Box>
      </Stack>
    </Box>
  );
};

export default Index;
