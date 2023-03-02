import React, {useState} from 'react';
import { Box, Image, Avatar, Flex } from '@chakra-ui/react';
import logo from '../assets/event-circle.svg';
import notification from '../assets/notification.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Notification from '../Notification';


const Header = () => {
  const {user} = useSelector(state => state.user);
  const [openModal, setOpenModal] = useState(false)
  const showNotification = () => {
    setOpenModal(!openModal)
  }
   
  return (
    <>
    <Box bg='#CEDBE6' p='3' w='100%'>
        <Box w='90%' mx='auto'>
          <Flex justifyContent={'space-between'}>

            <Box>
              <Link to='/'><Image src={logo} w='100%' /></Link>
            </Box>

            <Box>
               <Flex gap={4} alignItems='center'>
                 <Box onClick={showNotification}>
                    <Image src={notification} />
                 </Box>
                 <Box>
                    <Avatar size='sm' name={`${user.firstname} ${user.lastname}`} bg='#0C4C84' color='white' fontWeight={'semibold'} />
                 </Box>
               </Flex>
            </Box>
          </Flex>
        </Box>
    </Box>
      {openModal && <Notification />}
    </>
  );
};

export default Header
