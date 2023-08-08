import React, {useState, useEffect} from 'react';
import { Box, Text } from '@chakra-ui/react';
import EventItem from './EventItem';
import { useSelector } from 'react-redux';


const Events = ({events}) => {
  const { user } = useSelector(state => state.user);
  const [sortedEvents, setSortedEvents] = useState([]);
  useEffect(() => {
    const sortedEvent = [...events]?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    setSortedEvents(sortedEvent);
  }, [events])

  console.log(events, sortedEvents);

  return (
    <Box textAlign={'center'} mt="20px">
      <>
        {events?.length === 0 ? (
          <Box
            minH={320}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box>
              <Text fontSize={30} fontWeight="medium" mb="3">
                Create your first event
              </Text>
              <Text fontSize={14} mb="3">
                Don’t waste time, click the button at right corner to <br />{' '}
                create your event attatch your gift list
              </Text>
            </Box>
          </Box>
        ) : (
          <Box>
            {sortedEvents?.map(event => {
              const guest = event.userId !== user.id
              return (
                <EventItem
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  descSummary={event.summary}
                  date={event.date}
                  image={event?.image}
                  published={event.published}
                  guest={guest}
                />
              );
            })}
          </Box>
        )}
      </>
    </Box>
  );
};

export default Events;
