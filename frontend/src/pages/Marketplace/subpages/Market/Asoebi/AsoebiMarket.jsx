import { Box, Flex, Image, Text, Heading } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import Search from '../../../../../components/Search/Search';
import BackButton from '../../../../../components/Buttons/BackButton';
import cartIcon from '../../../../assets/cart.svg';
import GiftCard from './GiftCard';
import { AsoebiContext } from '.';
import AsoebiDrawer from './AsoebiDrawer';
import { useSelector } from 'react-redux';

const AsoebiMarket = ({ setShowProducts, eventId }) => {
  const { asoebiItems } = useSelector(state => state.event);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { data, setAddedAsoebiItems } = useContext(AsoebiContext);

  useEffect(() => {
    let idList = [];
    data.map(ele => idList.push(ele.asoebiItem));
    let uniqueIds = new Set(idList);
    setAddedAsoebiItems([...uniqueIds]);
  }, [data, setAddedAsoebiItems]);

  return (
    <Box bg="#F5F5F5">
      <AsoebiDrawer
        openDrawer={drawerOpen}
        setOpenDrawer={setDrawerOpen}
        eventId={eventId}
      />
      <Box minH="600px" w="95%" mx="auto" pt="8">
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
              w="130px"
              h="45px"
              py="3"
              px="6"
              cursor="pointer"
              borderRadius={5}
              onClick={() => setDrawerOpen(true)}
            >
              <Flex gap={2} fontSize={14}>
                <Image src={cartIcon} />
                <Text>Cart </Text>
                <Text>{data.length} </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
        <Box mb="7">
          <Search />
        </Box>

        <Flex gap="24px" alignItems="center" flexWrap="wrap">
          {asoebiItems?.map(gift => (
            <GiftCard
              id={gift.id}
              title={gift.title}
              image={gift.image}
              amount={gift.amount}
              eventId={eventId}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default AsoebiMarket;
