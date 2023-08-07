import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Image,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import eye from '../../../../components/assets/eye.svg';
import message from '../../../../components/assets/message.svg';
import GiftDrawer from '../../../../components/Drawer/Drawer';
import { useSelector } from 'react-redux';

const PurchaseHistory = () => {
  const { giftItems, eventGiftTrans, complimentaryGifts } = useSelector(
    state => state.gift
  );

  const [showDrawer, setShowDrawer] = useState(false);
  const openDrawer = () => {
    setShowDrawer(true);
  };

  return (
    <Box minH="500px">
      {eventGiftTrans?.length > 0 ? (
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead bg="#EEEEEE" px="17px" py="40px">
              <Tr fontSize={14} color="black">
                <Th>Gift name</Th>
                <Th>Purchased by</Th>
                <Th>Complementary Gift</Th>
                <Th isNumeric>Amount</Th>
                <Th>Payment status</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {eventGiftTrans?.map(ele => {
                const gift = ele?.gift?.giftitemId
                  ? giftItems.find(x => x?.id === ele?.gift?.giftitemId)
                  : complimentaryGifts.find(
                      x => x?.id === ele?.complimentaryGift?.id
                    );
                return (
                  <>
                    <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                      <Td>{gift?.title}</Td>
                      <Td>
                        {ele.purchasedBy.firstname +
                          '  ' +
                          ele.purchasedBy.lastname}
                      </Td>
                      <Td>
                        {ele.giftId
                          ? ele.gift.complimentaryGift === 'none'
                            ? 'No'
                            : 'Yes'
                          : 'No'}
                      </Td>
                      <Td isNumeric>N{ele?.amount}</Td>
                      <Td>{ele.giftId ? ele.gift.status : 'COMPLETED'}</Td>
                      <Td>
                        <Flex gap={8}>
                          <Image src={eye} onClick={openDrawer} />
                          <Image src={message} />
                        </Flex>
                      </Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          h="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box textAlign="center">
            <Heading fontSize={28} mb="3">
              No one has purchased your gifts yet
            </Heading>
            <Text fontSize={18}>All your purchases will appear here</Text>
          </Box>
        </Box>
      )}
      {showDrawer ? <GiftDrawer /> : null}
    </Box>
  );
};

export default PurchaseHistory;
