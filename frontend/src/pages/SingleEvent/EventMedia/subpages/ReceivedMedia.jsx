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
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';

const ReceivedMedia = () => {
  const { hostRecievedFiles } = useSelector(state => state.event);

  const HandleClick = url => {
    window.open(url);
  };

  return (
    <Box>
      <TableContainer bg="white">
        <Table variant="simple">
          <Thead bg="#EEEEEE" px="17px" py="40px">
            <Tr fontSize={14} color="black">
              <Th>S/N</Th>
              <Th>Gift name</Th>
              <Th>Sent By</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {hostRecievedFiles.map((file, index) => {
              return (
                <>
                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                    <Td>{index + 1}</Td>
                    <Td>Image {index + 1}</Td>
                    <Td>{file.user}</Td>
                    <Td color="#009F94">
                      <Flex gap={8}>
                        <Text onClick={() => HandleClick(file.url)}>View</Text>
                        {/* <a
                          href={file.url}
                          download={`Image ${index + 1}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a> */}
                      </Flex>
                    </Td>
                  </Tr>
                </>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ReceivedMedia;
