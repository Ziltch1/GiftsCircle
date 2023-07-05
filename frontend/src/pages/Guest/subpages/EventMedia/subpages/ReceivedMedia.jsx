import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ReceivedMedia = () => {
  const { eventMediaFiles } = useSelector(state => state.event);

  const HandleClick = url => {
    window.open(url);
  };

  return (
    <Box>
      {eventMediaFiles?.length > 0 ? (
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead bg="#EEEEEE" px="17px" py="40px">
              <Tr fontSize={14} color="black">
                <Th>S/N</Th>
                <Th>Media Type</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {eventMediaFiles
                ?.filter(ele => ele.visibility === 'PUBLIC')
                .map((file, index) => {
                  return (
                    <>
                      <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                        <Td>{index + 1}</Td>
                        <Td>Image {index + 1}</Td>
                        <Td color="#009F94">
                          <Flex gap={8}>
                            <Text onClick={() => HandleClick(file.url)}>
                              View
                            </Text>
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
        <Box mt="16">
          <Heading textAlign="center" fontWeight="semibold" fontSize={25}>
            Sorry! You haven't been sent any media
          </Heading>
        </Box>
      )}
    </Box>
  );
};

export default ReceivedMedia;
