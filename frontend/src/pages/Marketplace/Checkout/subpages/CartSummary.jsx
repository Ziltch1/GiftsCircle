import { Box, Heading, Text, Button, Divider, Stack, Flex,} from '@chakra-ui/react'
import React, {useContext} from 'react'
import PaymentButton from '../../../../components/Buttons/PaymentButton'
import { dispatch } from '../../../../redux/store'
import { BuyItems } from '../../../../redux/features/marketplace/service'
import { GiftContext } from '../../subpages/Market/Gifts'


const CartSummary = () => {
  const { GiftItems, setGiftItems, amount, setAddedGiftItems } =
    useContext(GiftContext);
    
  const HandleSubmit = () => {
    if (GiftItems.length > 0) {
      dispatch(BuyItems(GiftItems));
      setGiftItems([]);
      setAddedGiftItems([]);
      closeModal();
    } else {
      setShowDrawer();
    }
  };

  return (
    <Box bg='white' p='4' w='100%' borderRadius={5}>
      <Stack direction='column' spacing={4}>
        <Heading fontWeight='bold' textAlign='center' fontSize={18}>Order Summary</Heading>
        <Divider />
        <Flex alignItems='center' justifyContent='space-between'>
          <Text>Item's total (2)</Text>
          <Heading fontWeight='medium' fontSize={18}>₦ 155,000</Heading>
        </Flex>
        <Divider />
        <Flex alignItems='center' justifyContent='space-between'>
          <Text>Total</Text>
          <Heading fontWeight='medium' fontSize={18}>₦ 175,000</Heading>
        </Flex>
        <Divider />
        <PaymentButton action={HandleSubmit} amount={175000}/>
      </Stack>
    </Box>
  )
}

export default CartSummary