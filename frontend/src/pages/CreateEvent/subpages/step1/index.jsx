import {
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Select,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import BackButton from '../../../../components/Buttons/BackButton';
import { useSelector } from 'react-redux';
import {
  CreateEventApi1,
  UpdateEventApi1,
} from '../../../../redux/axios/apis/events';
import { dispatch } from '../../../../redux/store';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import FormFooter from '../../components/FormFooter';
import { setNewEvent } from '../../../../redux/features/events/eventSlice';
import { GetEventGifts } from '../../../../redux/features/events/service';
import { CancelModal } from '../../components/FormHeader';
import { GetDeliveryDetails } from '../../../../redux/features/user/service';

const BasicForm = ({ step, setStep }) => {
  const { user } = useSelector(state => state.user);
  const { newEvent, editEvent } = useSelector(state => state.event);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState(newEvent ? newEvent.title : '');
  const [hosts, setHosts] = useState(newEvent ? newEvent.host : '');
  const [coHost, setCoHost] = useState(newEvent ? newEvent.coHost : '');
  const [category, setCategory] = useState(newEvent ? newEvent.category : '');
  const [venue, setVenue] = useState(newEvent ? newEvent.venue : '');
  const [date, setDate] = useState(newEvent ? newEvent.date : '');
  const [startTime, setStartTime] = useState(
    newEvent ? newEvent.startTime : ''
  );
  const [endTime, setEndTime] = useState(newEvent ? newEvent.endTime : '');

  useEffect(() => {
    if (!newEvent) {
      const event = JSON.parse(localStorage.getItem('newEvent'));
      dispatch(setNewEvent(event));
    }
  }, []);

  const toast = useToast();
  const HandleSubmit = async e => {
    if (title && hosts && category && venue && date && startTime && endTime) {
      try {
        if (editEvent) {
          const formBody = {
            title,
            host: hosts,
            category,
            venue,
            date,
            start_time: startTime,
            end_time: endTime,
            timezone: '(GMT+1:00) West Central Africa',
            userId: user.id,
            id: newEvent.id,
          };
          const res = await UpdateEventApi1(formBody);
          localStorage.setItem('newEvent', JSON.stringify(res.data));
          dispatch(setNewEvent(res.data));
          dispatch(GetEventGifts(res.data.id));
          setStep(step + 1);
        } else {
          const formBody = {
            title,
            host: hosts,
            category,
            venue,
            date,
            start_time: startTime,
            end_time: endTime,
            timezone: '(GMT + 1:00) West Central Africa',
            userId: user.id,
            coHost: coHost,
          };
          const res = await CreateEventApi1(formBody);
          localStorage.setItem('newEvent', JSON.stringify(res.data));
          dispatch(setNewEvent(res.data));
          dispatch(GetEventGifts(res.data.id));
          dispatch(GetDeliveryDetails(res.data.id));
          setStep(step + 1);
        }
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)));
      }
    } else {
      toast({
        title: 'Error!',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const BackAction = () => {
    setOpenModal(true);
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
                  placeholder="Enter the name of the event"
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

              <Box mb="5">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Do you want to have co-host(s) for this event?
                </FormLabel>
                <Select
                  placeholder={
                    newEvent ? newEvent.coHost : 'Enter the hosts of the event'
                  }
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  value={coHost}
                  _placeholder={{ color: newEvent ? '#8C8C8C' : '#000' }}
                  onChange={e => setCoHost(e.target.value)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </Select>
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
                  <option value="Retirement Ceremony">
                    Retirement Ceremony
                  </option>
                  <option value="Graduation">Graduation Ceremony</option>
                  <option value="Induction">Induction Ceremony</option>
                  <option value="Wedding">Wedding Ceremony</option>
                  <option value="Funeral">Funeral Ceremony</option>
                  <option value="Others">Others</option>
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
                  value={date}
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

              {/* <Box mb="8">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Choose timezone
                </FormLabel>
                <TimezoneSelect
                  value={selectedTimezone}
                  onChange={setSelectedTimezone}
                />
              </Box> */}
            </FormControl>
          </Box>
        </Flex>

        {openModal && <CancelModal setOpenModal={setOpenModal} />}
      </Box>

      <FormFooter action={HandleSubmit} step={step} />
    </Box>
  );
};

export default BasicForm;
