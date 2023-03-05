import React, { useState } from 'react';
import {
  Box,
  Image,
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuDivider,
  MenuItem,
} from '@chakra-ui/react';
import logo from '../assets/event-circle.svg';
import notification from '../assets/notification.svg';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Notification from '../Notification';
import { dispatch } from '../../redux/store';
import { setToken } from '../../redux/features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [openModal, setOpenModal] = useState(false);
  const showNotification = () => {
    setOpenModal(!openModal);
  };

  const LogoutHandler = () => {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setToken(null));
    navigate('/signin');
  };

  return (
    <>
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
                <Box onClick={showNotification}>
                  <Image src={notification} />
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
                    <MenuItem fontSize={16} fontWeight={500}>
                      Account
                    </MenuItem>
                    <MenuItem fontSize={16} fontWeight={500}>
                      Security
                    </MenuItem>
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
      {openModal && <Notification />}
    </>
  );
};

export default Header;
