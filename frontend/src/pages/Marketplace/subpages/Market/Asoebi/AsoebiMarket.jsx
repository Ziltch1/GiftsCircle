import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import Search from '../../../../../components/Search/Search';
import BackButton from '../../../../../components/Buttons/BackButton';
import cartIcon from '../../../../assets/cart.svg';
import { AsoebiContext } from '.';
import AsoebiDrawer from './AsoebiDrawer';
import { useSelector } from 'react-redux';
import DisplayCard from '../../../../../components/Card';

const AsoebiMarket = ({ setShowProducts, eventId, setShowCheckout,}) => {
  const { asoebiItems } = useSelector(state => state.event);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { checkoutData } = useSelector(state => state.market);

  const {
    data,
    setAddedAsoebiItems,
    setAmount,
    addedAsoebiItems,
    setAsoebiItems,
    addForGuest,
  } = useContext(AsoebiContext);
  const { user } = useSelector(state => state.user);

  useEffect(() => {
    let idList = [];
    data.map(ele => {
      if (addForGuest) {
        idList.push(ele.asoebiItem);
      } else {
        idList.push(ele.ItemId);
      }
      return ele;
    });
    let uniqueIds = new Set(idList);
    setAddedAsoebiItems([...uniqueIds]);

    let amount = 0;

    data.forEach(ele => {
      amount += addForGuest
        ? asoebiItems.find(x => x.id === ele.asoebiItem).amount
        : asoebiItems.find(x => x.id === ele.ItemId).amount;
    });
    setAmount(amount);
  }, [data, setAddedAsoebiItems, asoebiItems, setAmount, addForGuest]);

  useEffect(() => {
    const { data } = checkoutData;
    setAsoebiItems([...data]);
    const ids = [];
    data.forEach(x => ids.push(x.ItemId));
    setAddedAsoebiItems([...ids]);
  },[checkoutData])

  const AddAsoebi = id => {
    if (!addedAsoebiItems.includes(id)) {
      if (addForGuest) {
        const formBody = {
          eventId: eventId,
          userId: user.id,
          asoebiItem: id,
          increment: 0,
          purchasedByHost: !addForGuest,
        };
        setAsoebiItems(prev => [...prev, formBody]);
        setAddedAsoebiItems(prev => [...prev, id]);
      } else {
        const data = asoebiItems.find(x => x.id === id);

        const formBody = {
          ItemId: id,
          userId: user.id,
          quantity: 1,
          amountPaid: data.amount,
          status: 'PAID',
          category: 'ASOEBI',
        };
        setAsoebiItems(prev => [...prev, formBody]);
        setAddedAsoebiItems(prev => [...prev, id]);
      }
    }
  };


  return (
    <Box bg="#F5F5F5">
      <AsoebiDrawer
        openDrawer={drawerOpen}
        setOpenDrawer={setDrawerOpen}
        eventId={eventId}
        setShowCheckout={setShowCheckout}
      />
      <Box minH="600px" w="100%" mx="auto" pt="8">
        <BackButton action={() => setShowProducts(false)} />
        <Box mb="8" mt="5">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Heading fontSize={30} mb="2">
                Marketplace
              </Heading>
              <Text fontSize={14} color="#717171">
                This is where you can buy some things you need for your event
                for your self
              </Text>
            </Box>

            <Box
              bg="#CCF2F0"
              w="150px"
              h="45px"
              py="3"
              px="6"
              cursor="pointer"
              borderRadius={5}
              onClick={() => setDrawerOpen(true)}
            >
              <Flex
                gap={2}
                fontSize={14}
                alignItems="center"
                justifyContent="space-between"
              >
                <Image src={cartIcon} />
                <Text>Cart </Text>
                <Box
                  py="2px"
                  borderRadius="100px"
                  w="29px"
                  px="3px"
                  color="white"
                  bg="#00BFB2"
                  textAlign="center"
                >
                  <Text>{data.length} </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box mb="7">
          <Search />
        </Box>

        <Flex justifyContent='space-between' alignItems="center" flexWrap="wrap">
          {asoebiItems?.map(item => (
            <DisplayCard
              id={item.id}
              data={item}
              action={AddAsoebi}
              text="Add to Cart"
              disabled={addedAsoebiItems.includes(item.id)}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default AsoebiMarket;
