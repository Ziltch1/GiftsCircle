import React, { useContext } from 'react';
import { Box, Text } from '@chakra-ui/react';
import EventItem from './EventItem';
import { useSelector } from 'react-redux';
import { SearchContext } from '../index';


const Events = ({events}) => {
  const { user } = useSelector(state => state.user);
  const [filtered] = useContext(SearchContext);
  return (
    <Box textAlign={'center'} mt="20px">
      <>
        {filtered?.length === 0 ? (
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
            {filtered?.map(event => {
              const guest = event.user_id !== user.id
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
