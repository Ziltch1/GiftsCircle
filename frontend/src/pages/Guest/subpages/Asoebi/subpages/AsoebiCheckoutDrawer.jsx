import React, {useContext} from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Box,
    Text,
    Heading,
    Divider, Stack, Flex, Button
} from '@chakra-ui/react';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';
import { CartContext } from '..';

const AsoebiCheckoutDrawer = ({setShowAsoebiCheckout, setShowListDrawer, handleSubmit}) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const {amount, addedAsoebiItems} = useContext(CartContext);

    const closeModal = () => {
        setShowAsoebiCheckout(false);
    }

    const HandleSubmit = async () => {
        await handleSubmit();
        setShowListDrawer(false);
        setShowAsoebiCheckout(false);
    }
  return (
      <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          size="full"
          closeOnOverlayClick={false}
      >
          <DrawerOverlay />
          <DrawerContent>
              <DrawerCloseButton fontSize={20} m='2' onClick={closeModal} />

              <DrawerHeader mt='1'>
                  <Heading fontWeight="medium" fontSize="25px" textAlign='center' mb='3'>
                      Checkout 
                  </Heading>
              </DrawerHeader>
              
                  <DrawerBody mt="3" w='600px' mx='auto' overflow='auto'>

                  <Box bg="white" p="4" w="100%" borderRadius={5}>
                      <Stack direction="column" spacing={4}>
                          <Heading fontWeight="bold" textAlign="center" fontSize={18}>
                              Order Summary
                          </Heading>
                          <Divider />
                          <Flex alignItems="center" justifyContent="space-between">
                              <Text>{`Item's total (${addedAsoebiItems.length})`}</Text>
                              <Heading fontWeight="medium" fontSize={18}>
                                  ₦ {amount}
                              </Heading>
                          </Flex>
                          <Divider />
                          <Flex alignItems="center" justifyContent="space-between">
                              <Text>Delivery Fee</Text>
                              <Heading fontWeight="medium" fontSize={18}>
                                  {/* ₦ {deliveryAmount} */}
                                  0
                              </Heading>
                          </Flex>
                          <Divider />
                          <Flex alignItems="center" justifyContent="space-between">
                              <Text>Total</Text>
                              <Heading fontWeight="medium" fontSize={18}>
                                  ₦ {amount}
                              </Heading>
                          </Flex>
                          <Divider />

                          {/* {deliveryAmount !== 0 && ( */}
                          <PaymentButton
                              amount={amount}
                              action={HandleSubmit}
                          />
                          {/* )} */}
                      </Stack>
                  </Box>
                      
                  </DrawerBody>

                  {/* <DrawerFooter maxW='500px' mx='auto'>
                      <Button
                          variant="outline"
                          onClick={HandleClick}
                          mr={3}
                          color="white"
                          bg="#00BFB2"
                          fontWeight="medium"
                          fontSize="13px"
                      >
                          Make withdrawal
                      </Button>
                  </DrawerFooter> */}
          </DrawerContent>
      </Drawer>
  )
}

export default AsoebiCheckoutDrawer