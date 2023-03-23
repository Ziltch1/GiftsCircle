import React, { useEffect, useState } from 'react';
import { Box, UnorderedList, ListItem, HStack } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [navPosition, setNavPosition] = useState(0);
  const { pathname } = useLocation();
  const tabs = ['Events', 'Gifts', 'Marketplace', 'Deliveries', 'Settings'];
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
      case '/dashboard/marketplace':
        setNavPosition(2);
        break;

      default:
        setNavPosition(0);
        break;
    }
  }, [pathname]);

  return (
    <Box boxShadow={'md'} bg="white" w="100%" h="60px" pt="7">
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
