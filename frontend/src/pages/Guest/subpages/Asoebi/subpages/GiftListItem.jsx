import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';
import cardImg from '../../../../assets/giftItemImage.svg'
import { useSelector } from 'react-redux';

const GiftListItem = ({item, asoebiCart, setAsoebiCart}) => {
    console.log(asoebiCart);
    const handleDelete = (id) => {
        const filteredArray = asoebiCart.filter(obj => obj !== id);
        setAsoebiCart(filteredArray);
        console.log(id);
    }
  return (
      <Box
          bg="#FAFAFA"
          p="3"
          mb="4"
          border="1.5px solid #FAFAFA"
          borderRadius={10}
          w='100%'
          _hover={{ border: '1.5px solid #C6C6C6', boxShadow: 'sm' }}
      >
          <Flex gap={3}>
              <Image
                  src={item?.image}
                  w="90px"
                  h="90px"
                  borderRadius={5}
                  alt="gift item image"
                  objectFit='cover'
              />
              <Box w="350px">
                  <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb='2'>
                      {item?.details}
                  </Heading>
                  <Button
                      bg="none"
                      p="0"
                      _hover={{ bg: 'none' }}
                      display="flex"
                      alignItems="center"
                      gap={3}
                      color="#F5222D"
                      onClick={() => handleDelete(item?.id)}
                  >
                      <DeleteIcon fontSize={16} />
                      <Text fontWeight="medium" fontSize={14}>
                          Remove from list
                      </Text>
                  </Button>
              </Box>
              <Box>
                  <Text fontWeight='bold' fontSize={15}>₦ {item?.amount}</Text>
              </Box>
          </Flex>
      </Box>
  )
}

export default GiftListItem