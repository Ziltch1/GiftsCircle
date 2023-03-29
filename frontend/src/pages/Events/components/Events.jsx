import React from 'react'
import { Box, Text } from '@chakra-ui/react';
import EventItem from './EventItem';

const Events = ({event}) => {
    
  return (
      <Box textAlign={'center'} mt="20px">
          <>
              {event.length === 0 ? (
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
                      {event.map(event => (
                          <EventItem
                              key={event.id}
                              id={event.id}
                              title={event.title}
                              descSummary={event.summary}
                              date={event.date}
                              image={event?.image}
                              published={event.published}
                          />
                      ))}
                  </Box>
              )}
          </>
      </Box>
  )
}

export default Events