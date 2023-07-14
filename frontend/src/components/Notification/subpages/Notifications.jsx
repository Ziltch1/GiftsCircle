import { Box, Heading, Text, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { UpdateUserNotificationApi } from '../../../redux/axios/apis/user';
import { dispatch } from '../../../redux/store';
import { GetUserNotifications } from '../../../redux/features/user/service';

const Notifications = ({notifications, setNotifications, setNotificationLength}) => {

  const { user } = useSelector(state => state.user);

  const updateNotification = async (id) => {
    try {
      const res = await UpdateUserNotificationApi(id);
      const data = await res.data;
      setNotificationLength((prevCount) => prevCount - 1);
      setNotifications((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, read: true } : item
        )
      )
    } catch (error) {
      console.log(error);
    }
  };

  console.log(notifications);

  // const updateNotification = async id => {
  //   try {
  //     const res = await UpdateUserNotificationApi(id);
  //     if (res.data) {
  //       dispatch(GetUserNotifications(user.id));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Box fontSize={14}>
      <Box>
        <VStack>
          {notifications?.map(item => (
            <Box key={item.id} width="100%" onClick={() => updateNotification(item.id)} cursor='pointer'>
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
              >
                <Box>
                  <Heading
                    fontWeight={item.read === true ? 'normal' : 'semibold'}
                    fontSize="13px"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {item.message}
                  </Heading>
                  <Text color="#009F94" fontWeight={'semibold'} fontSize={11}>
                    {moment(item.created_at).fromNow()}
                  </Text>
                </Box>
                {item.read === true ? null : (
                  <Box w="10px" h="10px" borderRadius="50%" bg="#009F94"></Box>
                )}
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Notifications;



export const ReadNotifications = ({ notifications, setNotifications, setNotificationLength }) => {
  const unreadNotifications = notifications.filter(item => item.read === false);
  const { user } = useSelector(state => state.user);
  // const updateNotification = async (id) => {
  //   try {
  //     const res = await UpdateUserNotificationApi(id);
  //     const data = await res.data;
  //     setNotificationLength((prevCount) => prevCount - 1);
  //     setNotifications((prevItems) =>
  //       prevItems.map((item) =>
  //         item.id === id ? { ...item, read: true } : item
  //       )
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const updateNotification = async id => {
    try {
      const res = await UpdateUserNotificationApi(id);
      if (res.data) {
        dispatch(GetUserNotifications(user.id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box fontSize={14}>
      <Heading fontWeight={'semibold'} fontSize="17px" mb="4">
        New
      </Heading>
      <Box>
        <VStack spacing={3}>
          {unreadNotifications.map(item => (
            <Box key={item.id} width="100%" cursor='pointer' onClick={() => updateNotification(item.id)}>
              <HStack
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={3}
              >
                <Box>
                  <Heading
                    fontWeight={item.read === true ? 'normal' : 'semibold'}
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
                {item.read === true ? null : <Box w="10px" h="10px" borderRadius="50%" bg="#009F94"></Box>}
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};
