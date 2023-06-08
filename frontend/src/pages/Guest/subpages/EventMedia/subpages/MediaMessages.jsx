import React, {useState, useEffect} from 'react'
import { GetEventMessagesApi } from '../../../../../redux/axios/apis/media';
import MessageModal from '../../../../SingleEvent/components/MessageModal'
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

const MediaMessages = () => {
    const [eventMessages, setEventMessages] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [eventMessage, setEventMessage] = useState({});
    const { newEvent } = useSelector(state => state.event);


    const getEventMessages = async () => {
        try {
            const response = await GetEventMessagesApi(newEvent.id);
            const data = response.data;
            setEventMessages(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEventMessages();
    }, []);


    const handleClick = (message) => {
        setShowModal(true);
        setEventMessage(message);
    }
  return (
      <Box>
          {showModal && <MessageModal message={eventMessage} setShowModal={setShowModal} />}
          {eventMessages?.length > 0 ?
              <TableContainer bg='white'>
                  <Table variant='simple'>
                      <Thead bg='#EEEEEE' px='17px' py='40px'>
                          <Tr fontSize={14} color='black'>
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
                                                      <Flex gap={8} cursor='pointer'>
                                                          <Text onClick={() => handleClick(message)}>View</Text>
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
              :
              <Box mt='16'>
                  <Heading textAlign='center' fontWeight='semibold' fontSize={25}>Sorry! You haven't been sent any media</Heading>
              </Box>
          }
      </Box>
  )
}

export default MediaMessages