import { Box, Flex, Button, Text, Image, GridItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { AddEventAsoebiApi } from '../../../../../redux/axios/apis/asoebi'

const GiftCard = ({ details, image, id, amount, eventId }) => {
  const {user} = useSelector(state => state.user);
  const [asoebiItem, setAsoebiItem] = useState([]);
  console.log(eventId);

  const formBody = {
    eventId: eventId,
    userId: user.id,
    asoebiItem: id,
    increment: 1,
  } 

  const AddGift = async (id) => {
    try {
      await AddEventAsoebiApi(formBody);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Flex>
      <Box
          w="275px"
          minH="250px"
          bg="white"
          p="2.5"
          borderRadius={10}
          boxShadow="sm"
          mb="5"
          cursor="pointer"
          key={id}
      >
          <Image
              src={image}
              w="100%"
              h="142px"
              borderRadius={10}
              alt="gift item image"
              display="block"
              mx="auto"
              mb="2.5"
              objectFit='cover'
            //   onClick={openDrawer}
          />
          <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
              {details}
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
              <Text color="#27272E" fontWeight={600} fontSize={18}>
                  ₦ {amount}
              </Text>
              <Button
                  fontSize={13}
                  fontWeight={500}
                  bg='#00BFB2'
                //   bg={addedGiftItems.includes(id) ? 'grey' : '#00BFB2'}
                  color="white"
                  w="129px"
                  h="40px"
                  onClick={() => AddGift(id)}
                  id={id}
              >
                  Add to cart
              </Button>
          </Flex>
      </Box>
    </Flex>
  )
}

export default GiftCard