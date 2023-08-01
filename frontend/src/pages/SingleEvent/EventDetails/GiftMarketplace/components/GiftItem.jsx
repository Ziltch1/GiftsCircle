import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Button,
  Text,
  Image,
  Heading,
  Switch,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DeleteGiftItems } from '../../../../../redux/features/gift/service';
import { dispatch } from '../../../../../redux/store';
import { GiftContext } from '..';
import Counter from '../../../../../components/Counter/Counter';

const GiftItem = ({ gift, setData, data, id }) => {
  const toast = useToast();
  const { setAddedGiftItems, setGiftItems, handleIncrement, handleDecrement, GiftItems } = useContext(GiftContext);
  const { giftItems } = useSelector(state => state.gift);
  const giftItem = giftItems.find(x => x.id === gift.giftitemId);
  const [enableContribution, setEnableContribution] = useState(gift.enableContribution);

  const HandleDelete = () => {
    if (gift.id) {
      dispatch(DeleteGiftItems(gift.id, gift.eventId));
      setData(prev => prev.filter(x => x.id !== gift.id));
      setAddedGiftItems(prev => prev.filter(x => x !== giftItem.id));
    } else {
      setData(prev => prev.filter(x => x.giftitemId !== giftItem.id));
      setAddedGiftItems(prev => prev.filter(x => x !== giftItem.id));
      setGiftItems(prev => prev.filter(x => x.giftitemId !== giftItem.id));
    }
  };

  const ShowToast = () => {
    toast({
      title: `Error`,
      description: "You can't enable contribution for Items less than N20,000.",
      status: 'error',
      duration: 5000,
      isClosable: true,
      position: 'top'
    });
  };

  useEffect(() => {
    GiftItems.map(ele => {
      if (ele === gift) {
        ele.enableContribution = enableContribution;
        return ele;
      }
      return ele
    });
  }, [enableContribution]);

  return (
    <Box
      bg="#FAFAFA"
      p="3"
      mb="4"
      border="1.5px solid #FAFAFA"
      borderRadius={10}
      _hover={{ border: '1.5px solid #C6C6C6', boxShadow: 'sm' }}
    >
      <Flex gap={3}>
        <Image
          src={giftItem.image}
          w="90px"
          h="90px"
          borderRadius={5}
          alt="gift item image"
          objectFit="cover"
        />
        <Box w="390px">
          <Heading fontWeight="medium" fontSize="15px" lineHeight={6} mb="2">
            {giftItem.title}
          </Heading>
          <Box w="100%">
            <Flex gap={12}>
              <Text fontSize={14}>Enable contribution</Text>
              <Switch
                size="sm"
                colorScheme="teal"
                isChecked={giftItem.amount > 20000 ? enableContribution : false}
                onChange={e =>
                  giftItem.amount > 20000
                    ? setEnableContribution(e.target.checked)
                    : ShowToast()
                }
              />
            </Flex>
          </Box>
          <Button
            bg="none"
            p="0"
            _hover={{ bg: 'none' }}
            display="flex"
            alignItems="center"
            gap={3}
            color="#F5222D"
            onClick={() => HandleDelete()}
          >
            <DeleteIcon fontSize={17} />
            <Text fontWeight="medium" fontSize={14}>
              Remove from list
            </Text>
          </Button>
        </Box>

        <Box>
          <Text mb='3'>₦{giftItem.amount * gift.quantity}</Text>
          <Counter quantity={gift?.quantity} handleIncrement={handleIncrement} handleDecrement={handleDecrement} id={id} />
        </Box>
      </Flex>
    </Box>
  );
};

export default GiftItem;
