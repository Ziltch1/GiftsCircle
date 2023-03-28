import React, {useState} from 'react';
import { Box, Text, Heading, Button, Flex, Image } from '@chakra-ui/react';
import clock from '../../../../../../../components/assets/clock.svg';
import location from '../../../../../../../components/assets/map-pin.svg';
import Fundraising from './Fundraising';

const EventSchedule = ({ newEvent }) => {
  const date = newEvent?.date;
  const dateString = date;
  const newDate = new Date(dateString).toDateString();
  const [openDrawer, setOpenDrawer] = useState(false)

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  console.log(newEvent);

  return (
    <Box mb="6">
      {openDrawer && <Fundraising setOpenDrawer={setOpenDrawer} />}
      <Flex justifyContent="space-between" alignItems="flex-start">
        <Box w="610px">
          <Heading fontWeight={500} fontSize="24px" mb="4">
            {newEvent?.title}
          </Heading>
          <Text fontSize={14.5} lineHeight="27px" mb="4" dangerouslySetInnerHTML={{ __html: newEvent?.descSummary }} />
        </Box>

        <Box w="295px" h="auto">
          <Button
            w="100%"
            mb="4"
            fontWeight={550}
            bg="#EEEEEE"
            fontSize={14}
            boxShadow="md"
            onClick={showDrawer}
          >
            Start a fund raising
          </Button>
          <Box fontSize={14} mb="5" bg="#EEEEEE" borderRadius={5} p="5">
            <Image src={clock} mb="2" />
            <Text>{newDate}</Text>
            <Text>
              {newEvent?.start_time} – {newEvent?.end_time} {newEvent?.timezone}
            </Text>
          </Box>

          <Box fontSize={14} mb="5" bg="#EEEEEE" borderRadius={5} p="5">
            <Image src={location} mb="2" />
            <Text lineHeight="25px" fontSize="14px">
              {newEvent?.venue}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default EventSchedule;
