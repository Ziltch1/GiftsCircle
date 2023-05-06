import React, { useContext, useEffect, useState } from 'react';
import { Button, Flex, Image, Text, Box } from '@chakra-ui/react';
import ContributionModal from '../../ContributionModal';
import { useSelector } from 'react-redux';
import { CartContext } from '..';
import { GetAsoebiItemsApi } from '../../../../../redux/axios/apis/asoebi';

const GiftCard = ({ event, setAsoebiCart, asoebi, allAsoebi, ele }) => {
  const { asoebiCart, asoebiItems } = useContext(CartContext);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState([]);

  const getAsoebi = async() => {
    try {
      const res = await GetAsoebiItemsApi();
      const data = await res.data;
      setData(data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsoebi();
  }, []);

  const newData = data?.find(x => x.id === ele?.asoebiItem);

  const addGift = id => {
    setAsoebiCart([...asoebiCart, id]);
  };

  return (
    <>

      <Box
        w="295px"
        minH="260px"
        bg="white"
        p="2.5"
        borderRadius={10}
        boxShadow="sm"
        mb="5"
        cursor="pointer"
        key={newData?.id}
      >
        <Image
          src={newData?.image}
          w="100%"
          h="142px"
          borderRadius={10}
          alt="gift item image"
          
          objectFit='cover'
          mx="auto"
          mb="2.5"
        />
        <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
          {newData?.details}
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#27272E" fontWeight={600} fontSize={18}>
            ₦ {newData?.amount}
          </Text>
          <Button
            fontSize={13}
            fontWeight={500}
            bg={asoebiCart.includes(newData?.id) ? 'grey' : '#00BFB2'}
            color="white"
            w="129px"
            h="40px"
            onClick={() => addGift(newData?.id)}
            id={newData?.id}
          >
            {asoebiCart.includes(newData?.id) ? 'Added to cart' : 'Purchase'}
          </Button>
        </Flex>
      </Box>
     
    </>
  );
};

export default GiftCard;
