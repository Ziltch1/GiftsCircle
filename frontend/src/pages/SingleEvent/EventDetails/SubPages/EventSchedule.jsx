import React, { useState } from 'react';
import { Box, Text, Heading, Button, Flex, Image, Stack, Icon } from '@chakra-ui/react';
import clock from '../../../../components/assets/clock.svg';
import location from '../../../../components/assets/map-pin.svg';
import Fundraising from './Fundraising';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '../../../../redux/store';
import { setEditEvent } from '../../../../redux/features/events/eventSlice';
import DeleteModal from './DeleteModal';
import {FaCheck} from 'react-icons/fa'
import DeliveryAddressModal from './DeliveryAddressModal';
import EditAddressModal from './EditAddressModal';

const EventSchedule = ({ newEvent, deliveryAddress, isCoHost, getDeliveryAddress, setShowMarketplace }) => {
  const navigate = useNavigate();
  const date = newEvent.date;
  const dateString = date;
  const newDate = new Date(dateString).toDateString();
  const { fundRaising } = useSelector(state => state.event);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [confirmEditAddress, setConfirmEditAddress] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  // console.log(deliveryAddress);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const showDeleteModal = () => {
    setShowModal(true);
  };

  const handleClick = () => {
    setEditAddress(true)
  }

  const showGiftMarketplace = () => {
    setShowMarketplace(true)
  }

  return (
    <>
       {showModal && <DeleteModal setShowModal={setShowModal} />}
    <Box mb="6">
      {openDrawer && (
        <Fundraising setOpenDrawer={setOpenDrawer} id={newEvent.id} />
      )}
      {editAddress && <DeliveryAddressModal setEditAddress={setEditAddress} setIsEdited={setIsEdited} setConfirmEditAddress={setConfirmEditAddress}  />}
      {confirmEditAddress && <EditAddressModal setEditAddress={setEditAddress} setConfirmEditAddress={setConfirmEditAddress} setIsEdited={setIsEdited} deliveryAddress={deliveryAddress} getDeliveryAddress={getDeliveryAddress} />}
      <Flex justifyContent={['center', 'space-between']} alignItems={['center', 'flex-start']} flexWrap='wrap'>
        <Box w={['95%', '610px']}>
          <Heading fontWeight={500} fontSize="24px" mb="4">
            {newEvent.title}
          </Heading>
          <Text
            fontSize={14.5}
            lineHeight="27px"
            mb="4"
            dangerouslySetInnerHTML={{ __html: newEvent.descSummary }}
          />
        </Box>

        <Box w="295px" h="auto">

            {isCoHost && 
              <Box mb='4' w='100%'>
                <Button fontWeight='medium' color='white' w='100%' h='45px' bg="#00BFB2" fontSize={14.5} onClick={showGiftMarketplace}>Add your Gifts</Button>
              </Box>
            }
          {isCoHost && deliveryAddress && 
              <Box py='5' px='5' borderRadius={5} bg='#EEEEEE' mb='4' boxShadow='sm'>
                <Heading fontSize={18} fontWeight='medium' mb='2.5'>Delivery Address</Heading>
                <Text fontSize={14} mb='2.5'>{deliveryAddress.address}</Text>
                <Text fontSize={14} mb='2.5'>{deliveryAddress.info}</Text>
                <Text fontSize={14} mb='2.5'>{deliveryAddress.lga}, {deliveryAddress.state}.</Text>
                <Stack direction='row' justifyContent='space-between'>
                  {isEdited ? 
                    <Button fontWeight='medium' w='100%' color='white' fontSize={14} bg="#00BFB2" onClick={() => setConfirmEditAddress(true)}>Change Address</Button>
                    : 
                    <>
                      <Button fontWeight='medium' fontSize={14} color='#009F94' bg='gray.300' onClick={handleClick}><Icon as={FaCheck} fontWeight='medium' mr='2' /> Confirm</Button>
                      <Button fontWeight='medium' fontSize={14} bg='gray.300' onClick={() => setConfirmEditAddress(true)}>Change Address</Button>
                    </>
                  }
                </Stack>
              </Box>
          }
          {!newEvent.published && !isCoHost && (
            <Button
              width="100%"
              fontSize={16}
              mb="5"
              bg="#EEEEEE"
              borderRadius={5}
              p="5"
              onClick={() => {
                dispatch(setEditEvent(true));
                navigate('/create_event');
              }}
              boxShadow='md'
            >
              Edit Event
            </Button>
          )}
          {!fundRaising && (
            <Button
              w="100%"
              mb="4"
              fontWeight={550}
              bg="#EEEEEE"
              fontSize={14}
              boxShadow="md"
              onClick={() => showDrawer()}
            >
              Start a fund raising
            </Button>
          )}

          <Box fontSize={14} mb="5" bg="#EEEEEE" borderRadius={5} p="5">
            <Image src={clock} mb="2" />
            <Text>{newDate}</Text>
            <Text>
              {newEvent.start_time} – {newEvent.end_time} {newEvent.timezone}
            </Text>
          </Box>

          <Box fontSize={14} mb="5" bg="#EEEEEE" borderRadius={5} p="5">
            <Image src={location} mb="2" />
            <Text lineHeight="25px" fontSize="14px">
              {newEvent.venue}
            </Text>
          </Box>
            {!isCoHost && <Button w='100%' bg='red.500' h='50px' color='white' onClick={showDeleteModal}>Delete Event</Button>}
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default EventSchedule;
