import { Box, Stack, Divider } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader';
import DeliveryDetailsFooter from './subpages/DeliveryDetailsFooter';
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm';
import CartSummary from './subpages/CartSummary';
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard';
import BackButton from '../../../components/Buttons/BackButton';
import { useSelector } from 'react-redux';
import { GetDeliveryDetailsApi } from '../../../redux/axios/apis/user';


const Index = ({ setShowCheckout }) => {
  const [deliveryData, setDeliveryData] = useState([]);
  const [showDeliveryForm, setShowDeliveryForm] = useState(null)
  const { user } = useSelector(state => state.user);

  const handleClick = () => {
    setShowCheckout(false);
  };

  const getDeliveryDetails = async() => {
    try {
      const res = await GetDeliveryDetailsApi(user.id);
      const data = await res.data;
      console.log(data, res);
      setDeliveryData(data)
    } catch (error) {
      console.log(error);
    }
  }

  console.log(deliveryData);

  useEffect(() => {
    getDeliveryDetails();
    if (deliveryData.length > 0) {
      setShowDeliveryForm(false)
    }else if(deliveryData.length === 0){
      setShowDeliveryForm(true);
    }
  }, []);

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
            {deliveryData.length > 0 ? (
              <DeliveryDetailsCard data={deliveryData} />
            ) : (
              <DeliveryDetailsForm setShowDeliveryForm={setShowDeliveryForm} />
            )}
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