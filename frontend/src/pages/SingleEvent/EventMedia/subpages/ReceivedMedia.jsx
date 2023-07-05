import React, { useState, useEffect } from 'react';
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
import ImageModal from '../../components/ImageModal';
import { GetEventMessagesApi } from '../../../../redux/axios/apis/media';
import MessageModal from '../../components/MessageModal';

const ReceivedMedia = () => {
  const { guestSentFiles } = useSelector(state => state.event);
  const [data, setData] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [eventMessages, setEventMessages] = useState([]);
  const [itemUrl, setItemUrl] = useState('');
  const { newEvent } = useSelector(state => state.event);
  const [fileType, setFileType] = useState('');
  const [type, setType] = useState('');

  const getEventMessages = async () => {
    try {
      const response = await GetEventMessagesApi(newEvent.id);
      const data = response.data;
      setEventMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (fileType.includes('.mp4') || fileType.includes('.mkv')) {
      setType('VIDEO');
    } else if (fileType.includes('.mp3')) {
      setType('AUDIO');
    } else {
      setType('IMAGE');
    }
  }, [fileType]);

  const HandleClick = url => {
    setShowImageModal(true);
    setItemUrl(url);
  };

  useEffect(() => {
    if (guestSentFiles) {
      if (guestSentFiles.length > 0) {
        const filteredData = guestSentFiles.filter(
          ele => ele.visibility !== 'PRIVATE'
        );
        setData(filteredData);
      }
    }
  }, [guestSentFiles]);

  return (
    <Box>
      {showImageModal && (
        <ImageModal item={itemUrl} setShowImageModal={setShowImageModal} />
      )}
      {!data ? (
        <Box
          mt="16"
          minH="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Heading textAlign="center" fontWeight="semibold" fontSize={25}>
            Sorry! You haven't been sent any media
          </Heading>
        </Box>
      ) : (
        <>
          <TableContainer bg="white" mb="8">
            <Table variant="simple">
              <Thead bg="#EEEEEE" px="17px" py="40px">
                <Tr fontSize={14} color="black">
                  <Th>S/N</Th>
                  <Th>Media Type</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <>
                <Tbody>
                  <>
                    {data.map((file, index) => {
                      return (
                        <>
                          <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                            <Td>{index + 1}</Td>
                            <Td>Media {index + 1}</Td>
                            <Td color="#009F94">
                              <Flex gap={8} cursor="pointer">
                                <Text onClick={() => HandleClick(file?.url)}>
                                  View
                                </Text>
                              </Flex>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                  </>
                </Tbody>
              </>
            </Table>
          </TableContainer>
          {/* <EventMessages eventMessages={eventMessages} /> */}
        </>
      )}
    </Box>
  );
};

export default ReceivedMedia;

export const EventMessages = ({ eventMessages }) => {
  const [showModal, setShowModal] = useState(false);
  const [eventMessage, setEventMessage] = useState({});

  const handleClick = message => {
    setShowModal(true);
    setEventMessage(message);
  };

  return (
    <Box>
      {showModal && (
        <MessageModal message={eventMessage} setShowModal={setShowModal} />
      )}
      {eventMessages?.length > 0 ? (
        <TableContainer bg="white">
          <Table variant="simple">
            <Thead bg="#EEEEEE" px="17px" py="40px">
              <Tr fontSize={14} color="black">
                <Th>S/N</Th>
                <Th>Media Type</Th>
                <Th>Sent by</Th>
                <Th>Date sent</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <>
              <Tbody>
                <>
                  {eventMessages?.map((message, index) => {
                    return (
                      <>
                        <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                          <Td>{index + 1}</Td>
                          <Td>Message {index + 1}</Td>
                          <Td>{`${message.user.firstname} ${message.user.lastname}`}</Td>
                          <Td>{new Date(message.date).toDateString()}</Td>
                          <Td color="#009F94">
                            <Flex gap={8} cursor="pointer">
                              <Text onClick={() => handleClick(message)}>
                                View
                              </Text>
                            </Flex>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </>
              </Tbody>
            </>
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
