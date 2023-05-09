import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { GetUserSourvenirApi } from '../../../../redux/axios/apis/sourvenir';
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


const Sourvenirs = ({data}) => {
    const [newData, setNewData] = useState([])
    const {user} = useSelector(state => state.user);

    const getUserSourvenir = async() => {
        try {
            const response = await GetUserSourvenirApi(user.id);
            const data = response.data;
            setNewData(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserSourvenir();
    }, [user])

  return (
      <Box>
          <TableContainer bg="white">
              <Table variant="simple">
                  <Thead bg="#EEEEEE" px="17px" py="40px">
                      <Tr fontSize={14} color="black">
                          <Th>S/N</Th>
                          <Th>Sourvenir name</Th>
                          <Th>Amount</Th>
                          <Th>Category</Th>
                          <Th>Quantity purchased</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {newData.map((item, index) => {
                          const sourvenirItem = data.find(x => x.id === item.sourvenirItemId);
                          return (
                              <>
                                  <Tr fontSize={14} _hover={{ bg: '#FAFAFA' }}>
                                      <Td>{index + 1}</Td>
                                      <Td>{sourvenirItem?.title}</Td>
                                      <Td color="#009F94">
                                         ₦{sourvenirItem?.amount}
                                      </Td>
                                      <Td>{sourvenirItem?.category}</Td>
                                      <Td>{item.quantity}</Td>
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

export default Sourvenirs