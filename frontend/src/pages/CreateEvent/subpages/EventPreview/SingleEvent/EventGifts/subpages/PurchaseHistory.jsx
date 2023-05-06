import React from 'react';
import {
  Box, Heading, Text
} from '@chakra-ui/react';

const PurchaseHistory = ({ data }) => {

  return (
    <Box>

      <Box textAlign='center'>
        <Heading>Your purchase history is empty</Heading>
        <Text>Start adding gifts</Text>
      </Box>
      {/* <TableContainer bg="white">
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
      {showDrawer ? <GiftDrawer /> : null} */}
    </Box>
  );
};

export default PurchaseHistory;
