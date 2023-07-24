import React, { useContext, useEffect } from 'react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import { CartContext, DeliveryContext } from '..';

const AsoebiListItem = ({ item }) => {
  const {
    addedAsoebiItems,
    setAddedAsoebiItems,
    setAsoebiItems,
    AsoebiItems,
    asoebiItems,
  } = useContext(CartContext);
  const { setNewDeliveryData, newDeliveryData } = useContext(DeliveryContext);

  const handleDelete = id => {
    const filteredArray = addedAsoebiItems.filter(obj => obj !== id);
    setAddedAsoebiItems(filteredArray);

    const filteredAsoebi = AsoebiItems.filter(obj => obj.id !== id);
    setAsoebiItems(filteredAsoebi);
  };

  const newData = asoebiItems?.find(x => x.id === item?.asoebiItem);

  useEffect(() => {
    const filteredItemsArray = asoebiItems.filter(item => AsoebiItems.some(k => k.asoebiItem === item.id));
    setNewDeliveryData(filteredItemsArray);
  }, [AsoebiItems]);

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
          src={newData?.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit="cover"
        />
        <Box w="350px">
          <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb="2">
            {newData?.details}
          </Heading>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => handleDelete(item?.id)}
          >
            <DeleteIcon fontSize={16} />
            <Text fontWeight="medium" fontSize={14}>
              Remove from list
            </Text>
          </Button>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize={15}>
            ₦ {newData?.amount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AsoebiListItem;
