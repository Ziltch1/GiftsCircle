import { Box, Heading, Text, Divider, Stack, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
import PaymentButton from '../../../../../../components/Buttons/PaymentButton';
import { DeliveryContext } from '../..';
import { useSelector } from 'react-redux';
import { DeliveryTransApi } from '../../../../../../redux/axios/apis/delivery';

const CartSummary = ({
  amount,
  deliveryAmount,
  handleSubmit,
  cartLength,
  deliveryPercent,
}) => {
  const { newDeliveryData } = useContext(DeliveryContext);
  const { user } = useSelector(state => state.user);
  const { deliveryDetails } = useSelector(state => state.user);

  const singleItem = newDeliveryData.map(item => {
    const newData = {
      item: item.title,
      deliveryFee: (deliveryPercent * item.amount) / 100,
    };
    return newData;
  });

  const HandleSubmit = async () => {
    try {
      await handleSubmit();
      await DeliveryTransApi(user.id, singleItem);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(deliveryDetails);

  return (
    <Box bg="white" p="4" w="100%" borderRadius={5}>
      <Stack direction="column" spacing={4}>
        <Heading fontWeight="bold" textAlign="center" fontSize={18}>
          Order Summary
        </Heading>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>{`Item's total (${cartLength})`}</Text>
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
        {deliveryDetails && (
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
