import { Box, Heading, Text, Divider, Stack, Flex } from '@chakra-ui/react';
import React from 'react';
import PaymentButton from '../../../../components/Buttons/PaymentButton';
import { dispatch } from '../../../../redux/store';
import { BuyItems } from '../../../../redux/features/marketplace/service';
import { useSelector } from 'react-redux';
import { BuyItemsApi } from '../../../../redux/axios/apis/marketPlace';

const CartSummary = ({ data, amount, deliveryAmount }) => {

  const addUserPurchasedItems = async () => {
    // const purchasedItems = data.map(item => {
    //   return {
    //     id: item.id,
    //     userId: item.userId,
    //     quantity: item.quantity,
    //     amount: item.amountPaid,
    //     status: item.status,
    //     category: item.category,
    //   };
    // });
    try {
      await BuyItemsApi(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = () => {
    console.log('clicked');
    if (data?.length > 0) {
      addUserPurchasedItems()
    }
  };

  console.log(data);

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

        {/* {deliveryAmount !== 0 && ( */}
          <PaymentButton amount={amount + deliveryAmount} onClick={handleSubmit} />
        {/* )} */}
      </Stack>
    </Box>
  );
};

export default CartSummary;
