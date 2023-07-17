import React, { useState, useRef, useContext, useEffect } from 'react';
import {
  Box,
  Image,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem, Button, Heading,
  Text, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, PopoverCloseButton, PopoverHeader, HStack, VStack
} from '@chakra-ui/react';
import logo from '../assets/event-circle.svg';
import notification from '../assets/notification.svg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { dispatch } from '../../redux/store';
import { setToken } from '../../redux/features/auth/authSlice';
import { GetUserNotificationApi, UpdateUserNotificationApi } from '../../redux/axios/apis/user';
import { SocketContext } from '../../Layouts/DashBoardLayout';
import { FiMoreHorizontal } from 'react-icons/fi'
import moment from 'moment';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationLength, setNotificationLength] = useState(0);
  const dropdownRef = useRef(null);
  const { Notifications } = useContext(SocketContext);
  const [unreadNotifications, setUnReadNotifications] = useState([]);
  const options = ['All', 'Unread'];
  const [position, setPosition] = useState(0);

  // useEffect(() => {
  //   if (Notifications) {
  //     const data = Notifications.filter(
  //       item => item.read === false
  //     );
  //     setUnReadNotifications(data)
  //   }
  // }, [Notifications]);

  const getUserNotifications = async () => {
    try {
      const res = await GetUserNotificationApi(user.id);
      const data = await res.data;
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserNotifications();
  }, [])

  useEffect(() => {
    const unreadNotifications = notifications?.filter(item => item.read === false);
    setNotificationLength(unreadNotifications);
  }, [])


  const LogoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setToken(null));
    navigate('/signin');
  };

  const handleClick = (index) => {
    setPosition(index)
  }

  return (
    <>
      <Box bg="#CEDBE6" p="3" w="100%">
        <Box w="90%" mx="auto">
          <Flex justifyContent={'space-between'} alignItems='center'>
            <Box>
              <Link to="/">
                <Image src={logo} w="100%" />
              </Link>
            </Box>

            <Box>
              <Flex gap={4} alignItems='center'>
                <Box>
                  <Popover>
                    <Box bg='red.400' color='white' textAlign='center' position='relative' top='10px' left='10px' zIndex='2' fontSize={11} w='20px' h='20px' display='flex' justifyContent='center' alignItems='center' fontWeight='semibold' borderRadius='50%'>
                      <Text>{notificationLength.length}</Text>
                    </Box>
                    <PopoverTrigger>
                      <Image src={notification} w='25px' h='25px' />
                    </PopoverTrigger>
                    <PopoverContent border='none' outline='none' h='400px' overflow='auto'>
                      <PopoverArrow />
                      <PopoverHeader>
                        <Box>
                          <Box>
                            <Flex justifyContent={'space-between'} mb='3'>
                              <Heading fontWeight={'semibold'} fontSize='20px'>Notifications</Heading>
                              <FiMoreHorizontal style={{ fontSize: '25px' }} />
                            </Flex>
                          </Box>
                          <Box fontSize={14}>
                            {options.map((link, index) => <Button onClick={() => handleClick(index)} bg='none' style={index === position ? { backgroundColor: '#CCF2F0', color: '#009F94' } : {}} borderRadius='50px' _hover={{ bg: '#CCF2F0', color: '#009F94' }} fontSize={14} fontWeight='medium' mr='4'>{link}</Button>)}
                          </Box>
                        </Box>
                      </PopoverHeader>
                      <PopoverBody>
                        <NotificationList position={position} notifications={notifications} setNotifications={setNotifications} setNotificationLength={setNotificationLength} />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>

                <Menu>
                  <MenuButton
                    as={'button'}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                    border="none"
                    outline="none"
                  >
                    <Avatar
                      size="sm"
                      name={`${user.firstname} ${user.lastname}`}
                      bg="#0C4C84"
                      color="white"
                      fontWeight={'semibold'}
                    />
                  </MenuButton>
                  <MenuList zIndex={'overlay'}>
                    <Link to="/dashboard/settings">
                      <MenuItem fontSize={16} fontWeight={500}>
                        Account
                      </MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem
                      color="#F5222D"
                      fontSize={16}
                      fontWeight={500}
                      onClick={LogoutHandler}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Box>
    </>
  );
};

export default Header;





export const NotificationList = ({position, notifications, setNotifications, setNotificationLength}) => {

  const unreadNotifications = notifications?.filter(item => item.read === false);
  const navigate = useNavigate();

  const updateNotification = async (item) => {
    try {
      const res = await UpdateUserNotificationApi(item.id);
      const data = await res.data;
      setNotificationLength((prevCount) => prevCount - 1);
      setNotifications((prevItems) =>
        prevItems.map((key) =>
          key.id === item.id ? { ...item, read: true } : item
        )
      )
      if(item.referenceEvent){
        navigate(`/dashboard/event_details/${item?.referenceEvent}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {position === 0 ? 
          <Box fontSize={14}>
            <Box>
              <VStack>
                {notifications?.map((item) => {
                  return (
                  <Box key={item.id} width="100%" onClick={() => updateNotification(item)} cursor='pointer'>
                    <HStack
                      justifyContent="space-between"
                      alignItems="flex-start"
                      spacing={3}
                      mb='2'
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
                  )
                })}
              </VStack>
            </Box>
          </Box>
      : 
        <Box fontSize={14}>
          <Box>
            <VStack spacing={3}>
              {unreadNotifications.map(item => (
                <Box key={item.id} width="100%" cursor='pointer' onClick={() => updateNotification(item.id)}>
                  <HStack
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={3}
                    mb='2'
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
      }
    </>
  )
}
