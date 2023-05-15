import React, { useEffect, useState } from 'react';
import { Box, UnorderedList, ListItem, HStack } from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0);
  const { pathname } = useLocation();
  const {id} = useParams();
  const tabs = ['Events', 'Gifts', 'Marketplace', 'Deliveries', 'Settings'];
  // const test = pathname.includes('/gift_details');
  // console.log(test);
  const handleClick = index => {
    setNavPosition(index);
    switch (index) {
      case 0:
        navigate('/dashboard');
        setNavPosition(0);
        break;
      case 1:
        navigate('/dashboard/gifts');
        setNavPosition(1);
        break;
      case 2:
        navigate('/dashboard/marketplace');
        setNavPosition(2);
        break;
      case 3:
        navigate('/dashboard/deliveries');
        setNavPosition(3);
        break;
      case 4:
        navigate('/dashboard/settings');
        setNavPosition(4)
        break;
      case 5:
        navigate(`/dashboard/gift/gift_details/${id}`);
        setNavPosition(1);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case '/dashboard':
        setNavPosition(0);
        break;
      case '/dashboard/gifts':
        setNavPosition(1);
        break;
      case `/dashboard/gift/gift_details/${id}`:
        setNavPosition(1);
        break;
      case '/dashboard/marketplace':
        setNavPosition(2);
        break;
      case '/dashboard/deliveries':
        setNavPosition(3);
        break;
      case '/dashboard/settings':
        setNavPosition(4);
        break;

      default:
        setNavPosition(0);
        break;
    }
  }, [pathname]);

  return (
    <Box boxShadow={'lg'} bg="white" w="100%" h="60px" pt="7" borderBottom='0.1px solid lightgray'>
      <Box w="90%" mx="auto">
        <UnorderedList
          listStyleType={'none'}
          fontWeight="medium"
          fontSize="15px"
        >
          <HStack spacing={7} display="flex" alignItems="start">
            {tabs.map((tab, index) => (
              <ListItem
                key={index}
                cursor="pointer"
                w="115px"
                textAlign="center"
                pb="6px"
                onClick={() => handleClick(index)}
                style={
                  index === navPosition
                    ? {
                        borderBottom: '3px solid #00BFB2',
                        paddingBottom: '7px',
                        color: '#00BFB2',
                      }
                    : { color: '#717171' }
                }
              >
                {tab}
              </ListItem>
            ))}
          </HStack>
        </UnorderedList>
      </Box>
    </Box>
  );
};

export default Navbar;
