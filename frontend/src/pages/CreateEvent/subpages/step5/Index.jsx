import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Flex,
  Checkbox,
  FormLabel,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  useToast,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import errorImg from '../../../assets/errorImg.svg';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { EventSummaryApi } from '../../../../redux/axios/apis/events';
import { dispatch } from '../../../../redux/store';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';
import BackButton from '../../../../components/Buttons/BackButton';
import {
  setEditEvent,
  setNewEvent,
} from '../../../../redux/features/events/eventSlice';

const SummaryForm = ({ setStep }) => {
  const { newEvent } = useSelector(state => state.event);
  const event = JSON.parse(localStorage.getItem('newEvent'));
  const [openModal, setOpenModal] = useState(false);
  const [percentage, setPercentage] = useState(
    event ? event.percentageDonation : ''
  );
  const [publish, setPublish] = useState(false);
  const toast = useToast();

  const showModal = async () => {
    if (percentage) {
      setOpenModal(true);
    } else {
      toast({
        title: 'Error!',
        description: 'Please fill all empty fields',
        duration: 3000,
        isClosable: true,
        position: 'top',
        status: 'error',
      });
    }
  };

  const backAction = () => {
    setStep(3);
  };

  return (
    <Box mt="8" w="80%" mx="auto" mb="16">
      <ConfirmationModal
        setOpenModal={setOpenModal}
        isOpen={openModal}
        percentage={percentage}
        publish={publish}
      />

      <Box>
        <BackButton action={backAction} />
      </Box>
      <Flex alignItems="center" justifyContent="space-between" mb="5" mt="3">
        <Box>
          <Heading mb="2" fontSize={30} fontWeight="semibold">
            Summary
          </Heading>
          <Text color="#717171" fontSize={14}>
            Review all you have been setting so far.
          </Text>
        </Box>

        <Box>
          <Button color="#00BFB2" bg="none" onClick={() => setStep(5)}>
            <Flex alignItems="center" gap={2}>
              <Text>Preview your event</Text>
              <ExternalLinkIcon />
            </Flex>
          </Button>
        </Box>
      </Flex>

      <Box
        w="100%"
        bg="#EEEEEE"
        h="380px"
        borderRadius={5}
        mb="10"
        display="Flex"
        alignItems="center"
        justifyContent="Center"
      >
        <Image
          src={newEvent?.image}
          w="100%"
          h="100%"
          borderRadius={5}
          objectFit="contain"
        />
      </Box>

      <Box mb="10">
        <Heading mb="4" fontWeight={600} fontSize={18}>
          When should we publish your event?
        </Heading>
        <RadioGroup spacing={2}>
          <Stack direction="column">
            <Radio value="publish" onChange={() => setPublish(true)}>
              Publish now
            </Radio>
            <Radio value="publish later" onChange={() => setPublish(false)}>
              Publish later
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      <Box w="500px" mb="12">
        <Heading mb="4" fontWeight={600} fontSize={18}>
          Apply Donation to charity
        </Heading>
        <FormLabel fontWeight={550} fontSize={14}>
          How many percentage do you want to add?
        </FormLabel>
        <Box w="250px" mb="3">
          <DropdownList
            value={percentage}
            onChange={nextValue => setPercentage(nextValue.replace('%', ''))}
            data={['0.5%', '1%', '1.5%', '2%', '3.5%', '4.5%', '5%']}
          />
        </Box>
        <Box mb="2" display="flex" alignItems="center" gap={2}>
          <Checkbox isChecked={true} />
          <Text fontSize={14}>
            Apply {percentage} to all cost of items to be donated to charity
            homes
          </Text>
        </Box>
      </Box>

      <Box w="182px" mx="auto">
        <Button
          bg="#00BFB2"
          w="182px"
          fontSize={14}
          fontWeight={500}
          color="white"
          textAlign="center"
          onClick={() => showModal()}
        >
          Finish
        </Button>
      </Box>
    </Box>
  );
};

export default SummaryForm;

export const ConfirmationModal = ({
  setOpenModal,
  percentage,
  publish,
  isOpen,
}) => {
  const { onClose } = useDisclosure();
  const [isChecked, setIsChecked] = useState(false);
  const { newEvent } = useSelector(state => state.event);
  const navigate = useNavigate();

  const Submit = async () => {
    const formBody = {
      id: newEvent.id,
      published: publish,
      percentDonation: parseFloat(percentage),
      applyDonation: true,
    };
    if (isChecked) {
      try {
        const res = await EventSummaryApi(formBody);
        if (res.data) {
          localStorage.removeItem('newEvent');
          localStorage.removeItem('delivery');
          dispatch(setEditEvent(false));
          dispatch(setNewEvent(null));
          setOpenModal(false);
          navigate('/dashboard');
        }
      } catch (error) {
        setOpenModal(false);
        dispatch(createResponse(ErrorHandler(error)));
      }
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
            <ModalCloseButton onClick={() => setOpenModal(false)} />
            <ModalBody>
              <Image src={errorImg} display="block" mx="auto" mb="3" />
              <Box textAlign="center" mb="4">
                <Heading fontWeight={600} fontSize="25px" mb="3">
                  Enable Donations
                </Heading>
                <Text fontSize={14}>
                  Are you sure you want to add {percentage} to all items cost to
                  be donated to charity homes?
                </Text>
              </Box>

              <Box mb="5" display="flex" alignItems="center" gap={2}>
                <Checkbox
                  checked={isChecked}
                  onChange={e => setIsChecked(e.target.checked)}
                />
                <Text fontSize={14}>
                  I agree to Event Circle's terms and conditions
                </Text>
              </Box>

              <Box textAlign="center">
                <Button
                  fontWeight="medium"
                  fontSize={14}
                  color="white"
                  bg={isChecked ? '#00BFB2' : '#AAEAE5'}
                  onClick={() => Submit()}
                >
                  Yes add {percentage} of cost items
                </Button>
              </Box>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
