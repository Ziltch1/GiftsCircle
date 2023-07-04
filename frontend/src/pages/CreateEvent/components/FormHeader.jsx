import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Text,
  Image,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteEventApi } from '../../../redux/axios/apis/events';
import { setNewEvent } from '../../../redux/features/events/eventSlice';
import { dispatch } from '../../../redux/store';
import errorImg from '../../assets/errorImg.svg';
import { useSelector } from 'react-redux';

const FormHeader = ({ step }) => {
  const [openModal, setOpenModal] = useState(false);
  const texts = [
    'Basic Info',
    'Event Page',
    'Add Gift list',
    'Add delivery details',
    'Event confirmation',
  ];
  return (
    <>
      {openModal && <CancelModal setOpenModal={setOpenModal} />}
      <Box w="80%" mx="auto" mb="3">
        <Flex justifyContent="space-between" alignItems="center">
          <Box>
            <Flex alignItems="center" gap={6}>
              <CloseIcon
                fontSize={10}
                onClick={() => setOpenModal(true)}
                cursor="pointer"
              />
              <Heading fontWeight="medium" fontSize="20px">
                Create Event
              </Heading>
            </Flex>
          </Box>
          <Box fontSize={14}>
            Step {step}/5 -{' '}
            <span style={{ color: '#00BFB2' }}>  {texts[step - 1]} </span>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default FormHeader;

export const CancelModal = ({ setOpenModal }) => {
  const navigate = useNavigate();
  const { editEvent, newEvent } = useSelector(state => state.event);
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const closeModal = () => {
    setOpenModal(false);
  };

  const HandleSubmit = async () => {
    if (newEvent) {
      if (editEvent) {
        dispatch(setNewEvent(null));
        navigate('/dashboard');
      } else {
        const res = await DeleteEventApi(newEvent.id);
        if (res.status) {
          dispatch(setNewEvent(null));
          localStorage.removeItem('newEvent');
          navigate('/dashboard');
        }
      }
    } else {
      navigate('/dashboard');
    }
  };
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent maxW="420px" bg="white" py="8" px="6">
          <Box>
            <ModalCloseButton onClick={closeModal} />
            <ModalBody>
              <Image src={errorImg} display="block" mx="auto" mb="3" />
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="25px" mb="3">
                  Cancel Event!
                </Heading>
                <Text fontSize={14}>
                  Are you sure you want to cancel this event?
                </Text>
              </Box>

              <Box textAlign="center">
                <Link to="/dashboard">
                  <Button
                    fontWeight="medium"
                    fontSize={14}
                    color="white"
                    bg="#00BFB2"
                    onClick={() => HandleSubmit()}
                  >
                    Yes cancel event
                  </Button>
                </Link>
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
