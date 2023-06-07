import React, {useEffect, useState} from 'react';
import {
  Text,
  Heading,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
} from '@chakra-ui/react';
import flowerIcon from '../assets/flower.svg';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';
import { dispatch } from '../../redux/store';
import { setWelcomeModal } from '../../redux/utils/UtilSlice';

const WelcomeModal = () => {
  const { user } = useSelector(state => state.user);
  const { welcomeModal } = useSelector(state => state.util);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();
    let newGreeting = '';

    if (currentHour >= 5 && currentHour < 12) {
      newGreeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      newGreeting = 'Good afternoon';
    } else {
      newGreeting = 'Good evening';
    }
    setGreeting(newGreeting);
  }, []);

  return (
    <Box>
      <Modal isOpen={welcomeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Box maxW="623px" h="auto">
            <Box
              bg="#CEDBE6"
              borderTopRightRadius={'10px'}
              borderTopLeftRadius="10px"
              w="100%"
              h="180px"
              pt="5"
            >
              <Image src={flowerIcon} display="block" mx="auto" />
              <ModalCloseButton
                onClick={() => dispatch(setWelcomeModal(false))}
              />
            </Box>
            <Box
              bg="#0C4C84"
              borderBottomRightRadius={'6px'}
              borderBottomLeftRadius="6px"
              minH="200px"
            >
              <ModalBody>
                <Heading
                  textAlign={'center'}
                  mt="5"
                  mb="3"
                  fontSize="20px"
                  color="white"
                >
                  {greeting} {user.firstname}
                </Heading>
                <Text
                  color="white"
                  textAlign={'center'}
                  mb="5"
                  fontSize={'13px'}
                >
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Beatae ea cum dolores pariatur harum doloribus aliquam dicta
                  architecto laboriosam nulla?
                </Text>

                <Box textAlign="center">
                  <Button
                    onClick={() => dispatch(setWelcomeModal(false))}
                    textAlign="center"
                    mx="auto"
                    color={'#0C4C84'}
                    size="sm"
                  >
                    Go Explore <ArrowForwardIcon ml="2" />
                  </Button>
                </Box>
              </ModalBody>
            </Box>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default WelcomeModal;
