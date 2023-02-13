import React from 'react';
import { Box, Image, Avatar, AvatarBadge, Flex } from '@chakra-ui/react';
import logo from '../assets/event-circle.svg';
import notification from '../assets/notification.svg';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.auth.user);
  return (
    <Box bg="#CEDBE6" p="3" w="100%">
      <Box w="90%" mx="auto">
        <Flex justifyContent={'space-between'}>
          <Box>
            <Image src={logo} w="100%" />
          </Box>
          <Box>
            <Flex gap={4} alignItems="center">
              <Box>
                <Image src={notification} />
              </Box>
              <Box>
                <Avatar
                  size="sm"
                  name={`${user.firstname} ${user.lastname}`}
                  bg="#0C4C84"
                  color="#FFFFFF"
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Header;
