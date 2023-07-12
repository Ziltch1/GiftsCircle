import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Image,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem, Text
} from '@chakra-ui/react';
import logo from '../assets/event-circle.svg';
import notification from '../assets/notification.svg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import { dispatch } from '../../redux/store';
import { setToken } from '../../redux/features/auth/authSlice';
import { GetUserNotificationApi } from '../../redux/axios/apis/user';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationLength, setNotificationLength] = useState(0);
  const dropdownRef = useRef(null);

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


  const useOutsideClick = (ref, callback) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      document.addEventListener('click', handleClickOutside);

      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, [ref, callback]);
  };


  useOutsideClick(dropdownRef, () => {
    setOpenModal(false);
  });

  useEffect(() => {
    const unreadNotifications = notifications?.filter(item => item.read === false).length;
    setNotificationLength(unreadNotifications);
  }, [])

  const showNotification = () => {
    setOpenModal((prevState) => !prevState);
  };

  const LogoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setToken(null));
    navigate('/signin');
  };

  return (
    <>
      {openModal && 
      <Notification 
        notifications={notifications} 
        setNotifications={setNotifications} 
        setNotificationLength={setNotificationLength} 
      />}

      <Box bg="#CEDBE6" p="3" w="100%">
        <Box w="90%" mx="auto">
          <Flex justifyContent={'space-between'}>
            <Box>
              <Link to="/">
                <Image src={logo} w="100%" />
              </Link>
            </Box>

            <Box>
              <Flex gap={4} alignItems="center">
                <Box ref={dropdownRef} onClick={showNotification} position='relative' cursor='pointer'>
                  <Image src={notification} w='25px' h='25px' />
                  <Box bg='red.400' color='white' textAlign='center' position='absolute' top='-5px' right='-5px' fontSize={11} w='20px' h='20px' display='flex' justifyContent='center' alignItems='center' fontWeight='semibold' borderRadius='50%'>
                    <Text>{notificationLength}</Text>
                  </Box>
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
                    <Link to='/dashboard/settings'>
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
