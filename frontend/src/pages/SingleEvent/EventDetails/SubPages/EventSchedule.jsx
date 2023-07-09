import React, { useState } from 'react';
import { Box, Text, Heading, Button, Flex, Image } from '@chakra-ui/react';
import clock from '../../../../components/assets/clock.svg';
import location from '../../../../components/assets/map-pin.svg';
import Fundraising from './Fundraising';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dispatch } from '../../../../redux/store';
import { setEditEvent } from '../../../../redux/features/events/eventSlice';
import DeleteModal from './DeleteModal';

const EventSchedule = ({ newEvent }) => {
  const navigate = useNavigate();
  const date = newEvent.date;
  const dateString = date;
  const newDate = new Date(dateString).toDateString();
  const { fundRaising } = useSelector(state => state.event);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const showDeleteModal = () => {
    setShowModal(true);
  };

  return (
    <>
       {showModal && <DeleteModal setShowModal={setShowModal} />}
    <Box mb="6">
      {openDrawer && (
        <Fundraising setOpenDrawer={setOpenDrawer} id={newEvent.id} />
      )}
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box w="610px">
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
          {!newEvent.published && (
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
            <Button w='100%' bg='red.500' h='50px' color='white' onClick={showDeleteModal}>Delete Event</Button>
        </Box>
      </Flex>
    </Box>
    </>
  );
};

export default EventSchedule;
