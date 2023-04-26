import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
import axiosInstance from '../../../../redux/axios/axios';
import { setFundRaising } from '../../../../redux/features/events/eventSlice';
import { dispatch } from '../../../../redux/store';

const Fundraising = ({ setOpenDrawer, id }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

  const [amount, setAmount] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDesciption] = useState('');
  const [image, setImage] = useState(null);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const btnRef = React.useRef();

  const closeModal = () => {
    setOpenDrawer(false);
  };

  const handleClick = async () => {
    const formData = new FormData();
    formData.append('eventId', id);
    formData.append('amount', amount);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    if (!btnDisabled) {
      try {
        const res = await axiosInstance.post('/fundRaising/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        dispatch(setFundRaising(res.data));
        setOpenDrawer(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (amount === '' || title === '' || description === '' || image === '') {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [amount, title, description, image]);

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
            <Heading fontWeight="medium" fontSize="25px">
              Start a fundraising
            </Heading>
          </DrawerHeader>

          <FormControl isRequired>
            <DrawerBody mt="4">
              <Box fontSize={'12px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Fundraising title
                </FormLabel>
                <Input
                  type="text"
                  color="#000"
                  fontSize="14px"
                  placeholder="e.g  funds for honeymoon"
                  bg="#F4F4F4"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Box>
              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Tell your story / Descripe the Event
                </FormLabel>
                <Textarea
                  color="#000"
                  fontSize="14px"
                  placeholder="Tell your readers why you need their help and what you plan to use your donations for."
                  size="lg"
                  fontWeight="normal"
                  h="100px"
                  bg="#F4f4f4"
                  maxLength="255"
                  value={description}
                  onChange={e => setDesciption(e.target.value)}
                />
              </Box>
              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Upload images
                </FormLabel>
                <FormLabel
                  htmlFor="upload"
                  w="100%"
                  h="70px"
                  bg="#f4f4f4"
                  borderRadius={5}
                  display="flex"
                  justifyContent="center"
                  alignItems="center "
                >
                  <Text fontSize={14} color="#000">
                    {image
                      ? image.name
                      : 'Drag and drop files or Click to Browse'}
                  </Text>
                  <Input
                    type="file"
                    color="#A8A8A8"
                    id="upload"
                    display="none"
                    onChange={e => setImage(e.target.files[0])}
                  />
                </FormLabel>
              </Box>

              <Box fontSize={'13px'} mb="5">
                <FormLabel fontSize={'13px'} fontWeight="semibold">
                  Enter amount
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

              <Box fontSize={'13px'} mb="5">
                <Checkbox colorScheme="green" isChecked={true}>
                  <Text fontSize={12}>
                    I agree to Event circle’s Terms and Privacy Policy on
                    raising funds.
                  </Text>
                </Checkbox>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                onClick={() => handleClick()}
                mr={3}
                color="white"
                bg="#00BFB2"
                fontWeight="medium"
                fontSize="13px"
                disabled={btnDisabled}
                opacity={btnDisabled ? '0.5' : '1.0'}
              >
                Start fundraising
              </Button>
            </DrawerFooter>
          </FormControl>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Fundraising;
