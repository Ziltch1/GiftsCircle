import { Box, Flex, Button, Text, Image, GridItem } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { AddGiftApi } from '../../../../../redux/axios/apis/gift';
// import { AsoebiContext } from './Asoebi';

const GiftCard = ({ details, image, id, amount, eventId, cart, data, setCart, title }) => {
  // const { setAddedAsoebiItems, addedAsoebiItems, setAsoebiItems } =
  //   useContext(AsoebiContext);
  const { user } = useSelector(state => state.user);

  const AddAsoebi = async(id) => {
    if (!cart.includes(id)) {
      const formBody = { userId: user.id, amount: amount, quantity: 1, giftItemId: id, };
      try {
        await AddGiftApi(formBody);
      } catch (error) {
        console.log(error);
      }
      setCart([...cart, id]);
    }
  };

  return (
    <Flex justifyContent='center' alignItems='center' flexWrap='wrap'>
      <Box
        w="285px"
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
            bg={cart.includes(id) ? 'grey' : '#00BFB2'}
            color="white"
            w="129px"
            h="40px"
            onClick={() => AddAsoebi(id)}
            id={id}
          >
            {cart.includes(id) ? 'Added to cart' : 'Add to cart'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default GiftCard;
