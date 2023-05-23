import React, { useContext } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import { SourvenirContext } from '.';

const GiftListItem = ({ item }) => {
  const {
    setSourvernirItems,
    setAddedSourvernirItems,
    SourvenirItems,
    addedSourvernirItems,
    sourvernirItems,
  } = useContext(SourvenirContext);

  const handleDelete = id => {
    const filteredArray = SourvenirItems.filter(obj => obj.ItemId !== id);
    setSourvernirItems(filteredArray);

    const filteredItems = addedSourvernirItems.filter(obj => obj !== id);
    setAddedSourvernirItems(filteredItems);
  };

  const data = sourvernirItems.find(x => x.id === item.ItemId);
  return (
    <Box
      bg="#FAFAFA"
      p="3"
      mb="4"
      border="1.5px solid #FAFAFA"
      borderRadius={10}
      w="100%"
      _hover={{ border: '1.5px solid #C6C6C6', boxShadow: 'sm' }}
    >
      <Flex gap={3}>
        <Image
          src={data?.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit="cover"
        />
        <Box w="350px">
          <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb="2">
            {data?.details}
          </Heading>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => handleDelete(item?.itemId)}
          >
            <DeleteIcon fontSize={16} />
            <Text fontWeight="medium" fontSize={14}>
              Remove from list
            </Text>
          </Button>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={15}>
            ₦ {data?.amount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftListItem;
