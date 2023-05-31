import React, {useState, useEffect} from 'react';
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
  Text, Heading
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { GetGuestSentFilesApi } from '../../../../redux/axios/apis/media';

const ReceivedMedia = () => {
  // const { hostRecievedFiles } = useSelector(state => state.event);
  // console.log(hostRecievedFiles)
  const [hostRecievedFiles, setHostRecievedFiles] = useState([]);
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);

  const getGuestMedia = async () => {
    try {
      const response = await GetGuestSentFilesApi(newEvent.id, user.id);
      setHostRecievedFiles(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGuestMedia();
  }, []);

  const HandleClick = url => {
    window.open(url);
  };

  return (
    <Box>
      {hostRecievedFiles?.length > 0 ?
        <TableContainer bg='white'>
          <Table variant='simple'>
            <Thead bg='#EEEEEE' px='17px' py='40px'>
              <Tr fontSize={14} color='black'>
                <Th>S/N</Th>
                <Th>Media Type</Th>
                <Th>Seen by</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {hostRecievedFiles?.map((file, index) => {
                return (
                  <>
                    <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                      <Td>{index + 1}</Td>
                      <Td>Image {index + 1}</Td>
                      <Td>{file.user}</Td>
                      <Td color="#009F94">
                        <Flex gap={8}>
                          <Text onClick={() => HandleClick(file.url)}>View</Text>
                        </Flex>
                      </Td>
                    </Tr>
                  </>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
        :
        <Box mt='16'>
          <Heading textAlign='center' fontWeight='semibold' fontSize={25}>Sorry! You haven't been sent any media</Heading>
        </Box>
      }
    </Box>
  );
};

export default ReceivedMedia;
