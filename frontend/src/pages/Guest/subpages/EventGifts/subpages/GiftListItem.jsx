import React from 'react'
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, Button, Text, Image, Heading } from '@chakra-ui/react';

const GiftListItem = ({giftItem}) => {
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
                //   src={itemImage}
                  w="90px"
                  h="90px"
                  borderRadius={5}
                  alt="gift item image"
              />
              <Box w="350px">
                  <Heading fontWeight="medium" fontSize="14px" lineHeight={6} mb='2'>
                      XIAOMI Redmi Note 11S, 8GB/128GB, 5000 MAh Battery - Twilight Blue
                  </Heading>
                  <Button
                      bg="none"
                      p="0"
                      _hover={{ bg: 'none' }}
                      display="flex"
                      alignItems="center"
                      gap={3}
                      color="#F5222D"
                    //   onClick={() => HandleDelete()}
                  >
                      <DeleteIcon fontSize={16} />
                      <Text fontWeight="medium" fontSize={14}>
                          Remove from list
                      </Text>
                  </Button>
              </Box>
              <Box>
                  <Text fontWeight='bold' fontSize={15}>₦ 285,455</Text>
              </Box>
          </Flex>
      </Box>
  )
}

export default GiftListItem