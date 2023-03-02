import {
  Flex,
  Box,
  Input,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Select,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackButton from '../BackButton';
import TimezoneSelect from 'react-timezone-select';
import HostModal from './HostModal';
import { useSelector } from 'react-redux';

const BasicForm = () => {
  const { user } = useSelector(state => state.auth);
  const [openModal, setOpenModal] = useState(false);
  const [title, setTitle] = useState('');
  const [hosts, setHosts] = useState('');
  const [category, setCategory] = useState('');
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState({});

  const showModal = () => {
    setOpenModal(true);
  };



  const HandleSubmit = () => {
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

    
  };

  return (
    <Box mt='10'>
      <Box h="100%" overflow="auto" mb="12" w="750px" mx="auto">
        <Flex alignItems="start" justifyContent="space-between">
          <BackButton />
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
                  _placeholder={{ color: '#8C8C8C'}}
                  onChange={e => setTitle(e.target.value)}
                />
              </Box>

              <Box mb="5">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Who is hosting the event?
                </FormLabel>
                <Input
                  type="text"
                  placeholder="Enter the name of the event"
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  _placeholder={{ color: '#8C8C8C' }}
                  onChange={e => setHosts(e.target.value)}
                />
              </Box>

              <Box mb="8">
                <FormLabel fontWeight="semibold" fontSize={13.5}>
                  Event category
                </FormLabel>
                <Select
                  type="text"
                  placeholder="Select your category"
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  _placeholder={{ color: '#8C8C8C' }}
                  onChange={e => setCategory(e.target.value)}
                >
                  <option value="gfgffgf">Birthday</option>
                  <option value="gfgffgf">Naming Ceremony</option>
                  <option value="gfgffgf">Retirement Ceremony</option>
                  <option value="gfgffgf">Graduation Ceremony</option>
                  <option value="gfgffgf">Induction Ceremony</option>
                  <option value="gfgffgf">Wedding Ceremony</option>
                  <option value="gfgffgf">Funeral Ceremony</option>
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
                  placeholder="e.g 26, Beside Mouka foam, Mokola, Ibadan"
                  fontSize={14}
                  bg="#FAFAFA"
                  color="black"
                  _placeholder={{ color: '#8C8C8C' }}
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
                  _placeholder={{ color: '#8C8C8C' }}
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
                      placeholder="Start time"
                      fontSize={14}
                      bg="#FAFAFA"
                      color="black"
                      _placeholder={{ color: '#8C8C8C' }}
                      onChange={e => setStartTime(e.target.value)}
                    />
                  </Box>
                  <Box w="240px">
                    <FormLabel fontWeight="medium" fontSize={13.5}>
                      End time
                    </FormLabel>
                    <Input
                      type="time"
                      placeholder="Start time"
                      fontSize={14}
                      bg="#FAFAFA"
                      color="black"
                      _placeholder={{ color: '#8C8C8C' }}
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
      <Box
        borderTop="1px solid lightgray"
        py="3"
        h="65px"
        position="fixed"
        bottom="0"
        w="100%"
        bgColor="#FFF"
      >
        <Box textAlign="right" mr="5">
          <Button mr="5" fontSize={12} fontWeight="semibold" bg="#EEEEEE">
            Discard
          </Button>
          <Button
            bg="#00BFB2"
            fontSize={12}
            fontWeight="semibold"
            color="white"
            onClick={() => HandleSubmit()}
          >
            Save and continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BasicForm;
