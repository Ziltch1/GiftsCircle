import React, {useState, useEffect} from 'react'
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react';
import { GetEventAsoebiApi } from '../../../../redux/axios/apis/asoebi';


const Asoebi = ({data, newEvent}) => {
    const [newData, setNewData] = useState([])

    const getEventAsoebi = async () => {
        try {
            const response = await GetEventAsoebiApi(newEvent.id);
            const data = response.data;
            setNewData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getEventAsoebi();
    }, [])


  return (
      <Box>
          <TableContainer bg="white">
              <Table variant="simple">
                  <Thead bg="#EEEEEE" px="17px" py="40px">
                      <Tr fontSize={14} color="black">
                          <Th>S/N</Th>
                          <Th>Gift name</Th>
                          <Th>Event name</Th>
                          <Th>Amount</Th>
                          <Th>Category</Th>
                          <Th>Quantity purchased</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {newData.map((item, index) => {
                          const asoebiItem = data.find(x => x.id === item.asoebiItem);
                          return (
                              <>
                                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                      <Td>{index + 1}</Td>
                                      <Td>{asoebiItem?.title}</Td>
                                      <Td>{newEvent?.title}</Td>
                                      <Td color="#009F94">
                                          ₦{asoebiItem?.amount}
                                      </Td>
                                      <Td>{asoebiItem?.category}</Td>
                                      <Td>{item?.quantity}</Td>
                                  </Tr>
                              </>
                          );
                      })}
                  </Tbody>
              </Table>
          </TableContainer>
      </Box>
  )
}

export default Asoebi