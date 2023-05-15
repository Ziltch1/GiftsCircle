import React, { useEffect, useState } from 'react';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const Tabs = ({ navPosition, setNavPosition }) => {
  const [links, setLinks] = useState(['About event', 'Gift List', 'Media']);
  const { eventAsoebis, fundRaising } = useSelector(state => state.event);

  useEffect(() => {
    if (eventAsoebis.length > 0 && !links.includes('Asoebi')) {
      let updatedLinks = [...links, 'Asoebi'];

      setLinks(updatedLinks);
    }

    if (fundRaising && !links.includes('Fundraising')) {
      if (eventAsoebis.length > 0) {
        let initLinks = ['About event', 'Gift List', 'Media'];
        let updatedLinks = [...initLinks, 'Asoebi', 'FundRaising'];

        setLinks(updatedLinks);
      } else {
        let updatedLinks = [...links, 'Fundraising'];
        setLinks(updatedLinks);
      }
    }
  }, [eventAsoebis, fundRaising]);

  const handleClick = index => {
    setNavPosition(index);
  };

  return (
    <Box>
      <Box borderBottom="1.5px solid lightgrey" w="100%" mb="7">
        <Flex gap={8} fontSize="14px">
          {links.map((link, index) => (
            <Button
              key={index}
              onClick={() => handleClick(index)}
              style={
                index === navPosition
                  ? { borderBottom: '2px solid #00BFB2', fontWeight: 'bold' }
                  : { color: '#717171' }
              }
              bg="none"
              borderRadius={0}
              _hover={{ bg: 'none' }}
              fontWeight="medium"
              fontSize={14}
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
