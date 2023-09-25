import React from 'react';
import { Box, Flex, Button, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { dispatch } from '../../redux/store';
import { setNewEvent } from '../../redux/features/events/eventSlice';

const Tabs = ({ navPosition, setNavPosition }) => {
  const links = ['Events', 'Events history'];
  const handleClick = index => {
    setNavPosition(index);
  };
  return (
    <Box>
      <Flex pt="8" justifyContent={'space-between'} alignItems={['flex-start', 'center']} mb="8" flexDirection={['column', 'row']}>
        <Box mb={[3.5, 0]}>
          <Heading size="lg">Events</Heading>
        </Box>
        <Flex gap="4">
          <Link to="/event/join">
            <Button
              bg="rgba(204, 242, 240, 0.5)"
              color="#009F94"
              fontWeight={'medium'}
              fontSize="14px"
            >
              Join an event
            </Button>
          </Link>
          <Link to="/create_event">
            <Button
              bg="#00BFB2"
              color="white"
              fontWeight={'medium'}
              fontSize="14px"
              onClick={() => dispatch(setNewEvent(null))}
            >
              Create an event
            </Button>
          </Link>
        </Flex>
      </Flex>

      <Box borderBottom="1.5px solid lightgrey" w="100%" mb="5">
        <Flex gap={8} fontSize="14px">
          {links.map((link, index) => (
            <Button
              bg="none"
              _hover={{ bg: 'none' }}
              borderRadius={0}
              onClick={() => handleClick(index)}
              style={
                index === navPosition
                  ? { borderBottom: '2px solid #00BFB2' }
                  : { bg: 'none', borderRadius: '0px' }
              }
            >
              {link}
            </Button>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Tabs;
