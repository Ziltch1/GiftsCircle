import React, { useState } from 'react';
import { Button, Flex, Image, Text, Box } from '@chakra-ui/react';
import ContributionModal from '../../ContributionModal';
import { useSelector } from 'react-redux';

const GiftCard = ({ gift, event, giftCart, setGiftCart }) => {
  const [openModal, setOpenModal] = useState(false);
  const { giftItems } = useSelector(state => state.gift);

  const giftItem = giftItems.find(x => x.id === gift?.giftItemId);

  const addGift = (id) => {
    console.log(id, giftCart);
    setGiftCart([...giftCart, id])
  }

  return (
    <>
      {openModal && (
        <ContributionModal
          setOpenModal={setOpenModal}
          contribute={gift.enableContribution}
        />
      )}
      <Box
        w="285px"
        minH="250px"
        bg="white"
        p="2.5"
        borderRadius={10}
        boxShadow="sm"
        mb="5"
        cursor="pointer"
        key={gift?.id}
      >
        <Image
          src={giftItem?.image}
          w="279"
          h="142px"
          borderRadius={10}
          alt="gift item image"
          display="block"
          mx="auto"
          mb="2.5"
        />
        <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
          {giftItem?.details}
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#27272E" fontWeight={600} fontSize={18}>
            ₦ {giftItem?.amount}
          </Text>
          <Button
            fontSize={13}
            fontWeight={500}
            bg={giftCart.includes(gift?.giftItemId) ? 'grey' : '#00BFB2'}
            color="white"
            w="129px"
            h="40px"
            // onClick={() => setOpenModal(true)}
              onClick={() => addGift(gift?.giftItemId)}
            id={gift?.id}
          >
            {giftCart.includes(gift?.giftItemId) ? 'Added to cart' : 'Purchase'}
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default GiftCard;
