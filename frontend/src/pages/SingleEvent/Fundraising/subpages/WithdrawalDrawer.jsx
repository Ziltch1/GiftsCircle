import React, {useState, useEffect} from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Box,
    Text,
    Heading,
    Textarea,
    Input,
    FormLabel,
    Checkbox,
    FormControl,
    useToast,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const WithdrawalDrawer = ({setOpenDrawer, amount}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const toast = useToast();
//   const [amount, setAmount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [sortCode, setSortCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('')
  const btnRef = React.useRef();
  const {newEvent} = useSelector(state => state.event);

  console.log(newEvent);

  const withdrawalAmount = amount - ((newEvent?.percentDonation * amount)/100)

  const closeModal = () => {
    setOpenDrawer(false);
  };

  const HandleClick = async() => {
      if (fullName && sortCode && accountName && accountNumber) {
          toast({
              title: 'Success',
              description: 'Withdrawal made successfully',
              duration: 2000,
              position: 'top',
              isClosable: true,
              status: 'success'
          });
          setOpenDrawer(false);
      } else {
          toast({
              title: 'Error!',
              description: 'Please fill all the details',
              duration: 2000,
              position: 'top',
              isClosable: true,
              status: 'error'
          })
      }
  }

  

  return (
      <>
          <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size="full"
              closeOnOverlayClick={false}
          >
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerCloseButton fontSize={20} m='2' onClick={closeModal} />

                  <DrawerHeader mt='3'>
                      <Heading fontWeight="medium" fontSize="25px" textAlign='center' mb='3'>
                          Withdraw Your Fundraising
                      </Heading>
                      <Text textAlign='center' fontSize={14.5}>Note: {newEvent?.percentDonation}% has been removed from the fundraising for charity</Text>
                  </DrawerHeader>

                  <FormControl isRequired>
                      <DrawerBody mt="5" maxW='500px' mx='auto' overflow='auto'>
                          <Box fontSize={'12px'} mb="5">
                              <FormLabel fontSize={'13px'} fontWeight="semibold">
                                  Full Name
                              </FormLabel>
                              <Input
                                  type="text"
                                  color="#000"
                                  fontSize="14px"
                                  placeholder="fullname"
                                  bg="#F4F4F4"
                                  value={fullName}
                                  onChange={e => setFullName(e.target.value)}
                              />
                          </Box>
                         
                          <Box fontSize={'13px'} mb="5">
                              <FormLabel fontSize={'13px'} fontWeight="semibold">
                                  Enter bank sort code
                              </FormLabel>
                              <Input
                                  type="text"
                                  color="#000"
                                  fontSize="14px"
                                  placeholder="e.g Wema bank"
                                  bg="#F4F4F4"
                                  value={sortCode}
                                  onChange={e => setSortCode(e.target.value)}
                              />
                          </Box>
                          <Box fontSize={'13px'} mb="5">
                              <FormLabel fontSize={'13px'} fontWeight="semibold">
                                  Enter Account name
                              </FormLabel>
                              <Input
                                  type="text"
                                  color="#000"
                                  fontSize="14px"
                                  placeholder="e.g John Doe"
                                  bg="#F4F4F4"
                                  value={accountName}
                                  onChange={e => setAccountName(e.target.value)}
                              />
                          </Box>
                          <Box fontSize={'13px'} mb="5">
                              <FormLabel fontSize={'13px'} fontWeight="semibold">
                                  Enter Account number
                              </FormLabel>
                              <Input
                                  type="number"
                                  color="#000"
                                  fontSize="14px"
                                  placeholder="e.g 78774748828"
                                  bg="#F4F4F4"
                                  value={accountNumber}
                                  onChange={e => setAccountNumber(e.target.value)}
                              />
                          </Box>

                          <Box fontSize={'13px'} mb="5">
                              <FormLabel fontSize={'13px'} fontWeight="semibold">
                                 Amount to be withdrawn
                              </FormLabel>
                              <Input
                                  type="number"
                                  color="black"
                                  fontSize="14px"
                                  placeholder="e.g 550000"
                                  bg="#F4F4F4"
                                  value={withdrawalAmount}
                                  fontWeight='bold'
                                  disabled
                              />
                          </Box>

                          <Box fontSize={'13px'} mb="5">
                              <Checkbox colorScheme="green" isChecked={true}>
                                  <Text fontSize={12}>
                                      I agree to Event circle’s Terms and Privacy Policy on
                                      raising funds.
                                  </Text>
                              </Checkbox>
                          </Box>
                      </DrawerBody>

                      <DrawerFooter maxW='500px' mx='auto'>
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
                      </DrawerFooter>
                  </FormControl>
              </DrawerContent>
          </Drawer>
      </>
  )
}

export default WithdrawalDrawer