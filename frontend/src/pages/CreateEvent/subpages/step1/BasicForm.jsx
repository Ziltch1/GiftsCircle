import {
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Select, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackButton from '../BackButton';
import TimezoneSelect from 'react-timezone-select';
import HostModal from './HostModal';
import { useSelector } from 'react-redux';
import {
  CreateEventApi1,
} from '../../../../redux/axios/apis/events';
import { dispatch } from '../../../../redux/store';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import FormFooter from '../FormFooter';
import { setNewEvent } from '../../../../redux/features/events/eventSlice';
import { useNavigate } from 'react-router-dom';

const BasicForm = ({ step, setStep }) => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [hosts, setHosts] = useState('');
  const [category, setCategory] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const toast = useToast()

  const showModal = () => {
    setOpenModal(true);
  };

  const HandleSubmit = async (e) => {
    if(title && hosts && category && venue && date && startTime && endTime && selectedTimezone){
       const formBody = {
        title,
        host: hosts,
        category,
        venue,
        date,
        start_time: startTime,
        end_time: endTime,
        timezone: selectedTimezone.label,
        userId: user.id,
      };

      console.log(selectedTimezone);
      try {
          const res = await CreateEventApi1(formBody);
          localStorage.setItem('newEvent', JSON.stringify(res.data));
          dispatch(setNewEvent(res.data));
          setStep(step + 1);
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)));
      }
    }else{
      toast({
        title: 'Error!',
        description: "Please fill all fields",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      }) 
    };
  }

  const BackAction = () => {
    navigate('/dashboard');
  };

  return (
    <Box mt="10">
      <Box h="100%" overflow="auto" mb="12" w="750px" mx="auto">
        <Flex alignItems="start" justifyContent="space-between">
          <BackButton action={BackAction} />
          <Box w="500px" mx="auto" fontSize={13}>
            <Box mb="6">
              <Heading fontWeight="bold" fontSize="25px" mb="3">
                Add basic info
              </Heading>
              <Text color="#717171">
                Name your event and tell event-goers why they should come. Add
                details that highlight what makes it unique.
              </Text>
            </Box>
            <FormControl isRequired>
              <Box mb="5">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Event title
                </FormLabel>
                <Input
                  type="text"
                  placeholder={
                    newEvent ? newEvent.title : 'Enter the name of the event'
                  }
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  value={title}
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  onChange={e => setTitle(e.target.value)}
                />
              </Box>

              <Box mb="5">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Who is hosting the event?
                </FormLabel>
                <Input
                  type="text"
                  placeholder={
                    newEvent ? newEvent.hosts : 'Enter the hosts of the event'
                  }
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  value={hosts}
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  onChange={e => setHosts(e.target.value)}
                />
              </Box>

              <Box mb="8">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Event category
                </FormLabel>
                <Select
                  type="text"
                  placeholder={
                    newEvent ? newEvent.category : 'Select your category'
                  }
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Naming Ceremony">Naming Ceremony</option>
                  <option value="Retirement Ceremony">Retirement Ceremony</option>
                  <option value="Graduation">Graduation Ceremony</option>
                  <option value="Induction">Induction Ceremony</option>
                  <option value="Wedding">Wedding Ceremony</option>
                  <option value="Funeral">Funeral Ceremony</option>
                </Select>
              </Box>

              <Box mb="6">
                <Heading fontWeight="bold" fontSize="25px" mb="3">
                  Location
                </Heading>
                <Text color="#717171">
                  Allow attendees know where the event is taking place
                </Text>
              </Box>

              <Box mb="8">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Event venue for your event
                </FormLabel>
                <Input
                  type="text"
                  placeholder={
                    newEvent
                      ? newEvent.venue
                      : 'e.g 26, Beside Mouka foam, Mokola, Ibadan'
                  }
                  fontSize={14}
                  bgColor="#FAFAFA"
                  color="black"
                  value={venue}
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  onChange={e => setVenue(e.target.value)}
                />
              </Box>

              <Box mb="6">
                <Heading fontWeight="bold" fontSize="25px" mb="3">
                  Date and time
                </Heading>
                <Text color="#717171">
                  Tell event-goers when your event starts and ends so they can
                  make plans to attend.
                </Text>
              </Box>

              <Box mb="7">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Choose a date
                </FormLabel>
                <Input
                  type="date"
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  onChange={e => setDate(e.target.value)}
                />
              </Box>

              <Box mb="5">
                <FormLabel fontWeight="semibold" fontSize={13.5} mb="5">
                  Choose time
                </FormLabel>
                <Flex justifyContent="space-between">
                  <Box w="240px">
                    <FormLabel fontWeight="medium" fontSize={13.5}>
                      Start time
                    </FormLabel>
                    <Input
                      type="time"
                      placeholder={
                        newEvent ? newEvent.start_time : 'Start time'
                      }
                      fontSize={14}
                      bg="#FAFAFA"
                      color="black"
                      _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                      value={startTime}
                      onChange={e => setStartTime(e.target.value)}
                    />
                  </Box>
                  <Box w="240px">
                    <FormLabel fontWeight="medium" fontSize={13.5}>
                      End time
                    </FormLabel>
                    <Input
                      type="time"
                      placeholder={newEvent ? newEvent.end_time : 'End time'}
                      fontSize={14}
                      bg="#FAFAFA"
                      color="black"
                      _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                      value={endTime}
                      onChange={e => setEndTime(e.target.value)}
                    />
                  </Box>
                </Flex>
              </Box>

              <Box mb="8">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Choose timezone
                </FormLabel>
                <TimezoneSelect
                  value={selectedTimezone}
                  onChange={setSelectedTimezone}
                />
              </Box>
            </FormControl>
          </Box>
        </Flex>

        {openModal && <HostModal setOpenModal={setOpenModal} />}
      </Box>

      <FormFooter action={HandleSubmit} step={step} />
    </Box>
  );
};

export default BasicForm;
