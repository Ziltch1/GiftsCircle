import { Box, Heading, Text, Image, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import avatar from '../../../components/assets/user-notification.svg';
import { useSelector } from 'react-redux';
import moment from 'moment';

const Notifications = () => {
  const { notifications } = useSelector(state => state.user);
  return (
    <Box fontSize={14} >
      {/* <Heading fontWeight={'semibold'} fontSize="17px" mb="4">
        New
      </Heading> */}
      <Box>
        <VStack>
          {notifications.map(item => (
            <Box key={item.id} width="100%">
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
              >
                {/* <Image src={avatar} /> */}
                <Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize="13px"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {item.message}
                  </Heading>
                  <Text color="#009F94" fontWeight={'semibold'} fontSize={11}>
                    {moment(item.created_at).fromNow()}
                  </Text>
                </Box>
                <Box w="10px" h="10px" borderRadius="50%" bg="#009F94"></Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Notifications;

export const ReadNotifications = () => {
  const { notifications } = useSelector(state => state.user);
  return (
    <Box fontSize={14}>
      <Heading fontWeight={'semibold'} fontSize="17px" mb="4">
        New
      </Heading>
      <Box>
        <VStack spacing={3}>
          {notifications.map(item => (
            <Box key={item.id} width="100%">
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
              >
                <Image src={avatar} />
                <Box>
                  <Heading
                    fontWeight={'medium'}
                    fontSize="13px"
                    mb="1"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {item.message}
                  </Heading>
                  <Text color="#009F94" fontWeight={'semibold'} fontSize={11}>
                    {moment(item.created_at).fromNow()}
                  </Text>
                </Box>
                <Box w="10px" h="10px" borderRadius="50%" bg="#009F94"></Box>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
