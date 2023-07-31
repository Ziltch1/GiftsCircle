import { Box, Heading, Text, Divider, Stack, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import PaymentButton from '../../../../components/Buttons/PaymentButton';
import { dispatch } from '../../../../redux/store';
import { GetUserMarketItems } from '../../../../redux/features/marketplace/service';
import { setCheckoutData } from '../../../../redux/features/marketplace/marketSlice';
import { BuyItemsApi } from '../../../../redux/axios/apis/marketPlace';
import { DeliveryTransApi } from '../../../../redux/axios/apis/delivery';
import { useSelector } from 'react-redux';
import { DeliveryContext } from '../..';


const CartSummary = ({ data, amount, deliveryAmount, setShowCheckout, deliveryPercent }) => {
  const {user} = useSelector(state => state.user);
  const {newDeliveryData, deliveryData, setDeliveryData} = useContext(DeliveryContext);

  const singleItem = newDeliveryData.map((item) => {
    const newData = {
      item: item.title,
      deliveryFee: ((deliveryPercent * item.amount)/100),
    }
    return newData
  });
  
  const HandleSubmit = async () => {
    if (data?.length > 0) {
      const delivery = await DeliveryTransApi(user.id, singleItem);
      const res = await BuyItemsApi(data);
      if (delivery.data) {
        dispatch(GetUserMarketItems(data[0].userId));
        setCheckoutData({ type: '', data: [], amount: 0 });
        setDeliveryData([]);
        setShowCheckout(false);
      }
    }
  };

  return (
    <Box bg="white" p="4" w="100%" borderRadius={5}>
      <Stack direction="column" spacing={4}>
        <Heading fontWeight="bold" textAlign="center" fontSize={18}>
          Order Summary
        </Heading>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>{`Item's total (${data.length})`}</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {amount}
          </Heading>
        </Flex>

        <Flex alignItems="center" justifyContent="space-between">
          <Text>Delivery Fee</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {deliveryAmount}
          </Heading>
        </Flex>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Total</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {amount + deliveryAmount}
          </Heading>
        </Flex>
        <Divider />

        {deliveryAmount !== 0 && (
          <PaymentButton
            amount={amount + deliveryAmount}
            action={HandleSubmit}
          />
        )}
      </Stack>
    </Box>
  );
};

export default CartSummary;
