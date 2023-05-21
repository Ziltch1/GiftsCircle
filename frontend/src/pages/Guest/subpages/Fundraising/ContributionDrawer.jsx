import React, { useState, useEffect } from 'react';
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
  Input,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { dispatch } from '../../../../redux/store';
import PaymentButton from '../../../../components/Buttons/PaymentButton';
import { DonateFundRaising } from '../../../../redux/features/events/service';

const ContributionDrawer = ({ setShowDrawer, fundRaising }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [amount, setAmount] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState(null);
  const [tel, setTel] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const btnRef = React.useRef();

  const closeModal = () => {
    setShowDrawer(false);
  };

  const handleClick = async () => {
    const formData = {
      fundId: fundRaising.id,
      firstName,
      lastName,
      email,
      tel,
      amount,
    };

    if (!btnDisabled) {
      try {
        dispatch(DonateFundRaising(formData, fundRaising.eventId));
        setShowDrawer(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (
      amount === '' ||
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      tel === ''
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [amount, firstName, lastName, email, tel]);

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={closeModal} />

          <DrawerHeader>
            <Heading fontWeight="medium" fontSize="22px" lineHeight={8} pr="4">
              <strong>Donating to</strong> {fundRaising?.title}
            </Heading>
          </DrawerHeader>

          <FormControl isRequired>
            <DrawerBody mt="4">
              <Box fontSize={'12px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  First name
                </FormLabel>
                <Input
                  type="text"
                  color="#000"
                  fontSize="14px"
                  placeholder="e.g  John"
                  bg="#F4F4F4"
                  id="firstname"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Box>
              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Last name
                </FormLabel>
                <Input
                  color="#000"
                  fontSize="14px"
                  placeholder="e.g Joshua"
                  fontWeight="normal"
                  bg="#F4f4f4"
                  id="lastname"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Box>
              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Email
                </FormLabel>
                <Input
                  type="email"
                  color="#A8A8A8"
                  fontSize="14px"
                  id="email"
                  fontWeight="normal"
                  bg="#F4f4f4"
                  placeholder="e.g john@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Box>

              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Phone number
                </FormLabel>
                <Input
                  type="text"
                  color="#A8A8A8"
                  fontSize="14px"
                  id="tel"
                  fontWeight="normal"
                  bg="#F4f4f4"
                  placeholder="e.g +234757583856"
                  value={tel}
                  onChange={e => setTel(e.target.value)}
                />
              </Box>

              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Amount to donate
                </FormLabel>
                <Input
                  type="number"
                  color="#000"
                  fontSize="14px"
                  placeholder="e.g 550000"
                  bg="#F4F4F4"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                />
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <PaymentButton
                amount={amount}
                action={handleClick}
                text="Contribute"
              />
            </DrawerFooter>
            <Text fontSize={12} textAlign="center">
              Payment securely processed by Paystack
            </Text>
          </FormControl>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default ContributionDrawer;
