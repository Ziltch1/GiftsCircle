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
} from '@chakra-ui/react';
import eye from '../../../../../components/assets/eye.svg';
import message from '../../../../../components/assets/message.svg';
import { useSelector } from 'react-redux';
import GiftDrawer from '../../../../../components/Drawer/Drawer';

const PurchaseHistory = ({ data }) => {
  const { giftItems } = useSelector(state => state.gift);

  const [showDrawer, setShowDrawer] = useState(false);
  const openDrawer = () => {
    setShowDrawer(true);
  };

  return (
    <Box>
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
            {data.map(ele => {
              const gift = giftItems.find(x => x.id === ele.giftItemId);

              return (
                <>
                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                    <Td>{gift.title}</Td>
                    <Td>Abdullahi Abodunrin</Td>
                    <Td>{ele.complimentaryGift === 'none' ? 'No' : 'Yes'}</Td>
                    <Td isNumeric># {gift.amount}</Td>
                    <Td>{ele.status}</Td>
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
      {showDrawer ? <GiftDrawer /> : null}
    </Box>
  );
};

export default PurchaseHistory;
