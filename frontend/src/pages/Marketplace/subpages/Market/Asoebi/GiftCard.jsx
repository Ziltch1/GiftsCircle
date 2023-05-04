import { Box, Flex, Button, Text, Image } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AsoebiContext } from '.';

const GiftCard = ({ title, image, id, amount, eventId }) => {
  const { setAddedAsoebiItems, addedAsoebiItems, setAsoebiItems } =
    useContext(AsoebiContext);
  const { user } = useSelector(state => state.user);

  const AddAsoebi = id => {
    if (!addedAsoebiItems.includes(id)) {
      const formBody = {
        eventId: eventId,
        userId: user.id,
        asoebiItem: id,
        increment: 0,
      };
      setAsoebiItems(prev => [...prev, formBody]);
      setAddedAsoebiItems(prev => [...prev, id]);
    }
  };

  return (
    <Flex>
      <Box
        w="275px"
        minH="250px"
        bg="white"
        p="2.5"
        borderRadius={10}
        boxShadow="sm"
        mb="5"
        cursor="pointer"
        key={id}
      >
        <Image
          src={image}
          w="100%"
          h="142px"
          borderRadius={10}
          alt="gift item image"
          display="block"
          mx="auto"
          mb="2.5"
          objectFit="cover"
          //   onClick={openDrawer}
        />
        <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
          {title}
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#27272E" fontWeight={600} fontSize={18}>
            ₦ {amount}
          </Text>
          <Button
            fontSize={13}
            fontWeight={500}
            // bg="#00BFB2"
            bg={addedAsoebiItems.includes(id) ? 'grey' : '#00BFB2'}
            color="white"
            w="129px"
            h="40px"
            onClick={() => AddAsoebi(id)}
            id={id}
          >
            {addedAsoebiItems.includes(id) ? 'Added to Cart' : 'Add to Cart'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GiftCard;
