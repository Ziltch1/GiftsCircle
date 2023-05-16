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
import { Link } from 'react-router-dom';
import { EventSummaryApi } from '../../../../redux/axios/apis/events';
import { dispatch } from '../../../../redux/store';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import { DropdownList } from 'react-widgets';
import 'react-widgets/styles.css';
import BackButton from '../../../../components/Buttons/BackButton';
import { setNewEvent } from '../../../../redux/features/events/eventSlice';

const SummaryForm = ({ setStep }) => {
  const { newEvent } = useSelector(state => state.event);
  const [openModal, setOpenModal] = useState(false);
  const [percentage, setPercentage] = useState('');
  const [publish, setPublish] = useState('publish');
  const toast = useToast();

  const showModal = () => {
    if (percentage && publish) {
      setOpenModal(true);
      console.log(percentage);
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
    setStep(4);
  };

  return (
    <Box mt="8" w="80%" mx="auto" mb="16">
      {openModal && (
        <ConfirmationModal
          setOpenModal={setOpenModal}
          percentage={percentage}
          publish={publish}
        />
      )}
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
          {/* <Link to={`/create_event/${newEvent?.id}/preview`}> */}
          <Button color="#00BFB2" bg="none" onClick={() => setStep(6)}>
            <Flex alignItems="center" gap={2}>
              <Text>Preview your event</Text>
              <ExternalLinkIcon />
            </Flex>
          </Button>
          {/* </Link> */}
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
          objectFit="cover"
        />
      </Box>

      <Box mb="10">
        <Heading mb="4" fontWeight={600} fontSize={18}>
          When should we publish your event?
        </Heading>
        <RadioGroup onChange={setPublish} value={publish} spacing={2}>
          <Stack direction="column">
            <Radio value="publish">Publish now</Radio>
            <Radio value="publish later">Publish later</Radio>
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
            onChange={nextValue => setPercentage(nextValue)}
            data={['0.5%', '1%', '1.5%', '2%', '3.5', '4.5%', '5%']}
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
          onClick={showModal}
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
  publishLater,
}) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const [isChecked, setIsChecked] = useState(false);
  const { newEvent } = useSelector(state => state.event);

  const closeModal = async () => {
    const formBody = {
      id: newEvent.id,
      published: publish,
      percentDonation: percentage,
      applyDonation: true,
    };
    if (isChecked) {
      try {
        await EventSummaryApi(formBody);
        localStorage.removeItem('newEvent');
        localStorage.removeItem('delivery');

        dispatch(setNewEvent(null));
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)));
      }
    }
    setOpenModal(false);
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
                <Link to={isChecked && '/dashboard'}>
                  <Button
                    fontWeight="medium"
                    fontSize={14}
                    color="white"
                    bg={isChecked ? '#00BFB2' : '#AAEAE5'}
                  >
                    Yes add {percentage} of cost items
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
