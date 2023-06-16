import { EditIcon,AddIcon } from '@chakra-ui/icons'
import { Box, Heading, Text, Stack, Flex, Button, Radio, Divider} from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'

const DeliveryDetails = ({deliveryDetails}) => {
  const {user} = useSelector(state => state.user)
  return (
    <Box w='100%' mt='4'>
      <Heading fontSize={14} fontWeight='semibold' mb='2'>ADDRESS BOOK 1</Heading>
      <Box mb='4' border='2px solid lightgray' borderRadius={7} p='5'>
        <Stack direction='row' justifyContent='space-between' alignItems='flex-start'>
          <Stack direction='row' spacing={3} alignItems='flex-start'>
            <Radio colorScheme='teal' />
            <Box>
              <Heading fontSize={15} mb='1'>{user.lastname} {user.firstname}</Heading>
              <Text fontSize={14} mb='1'>{deliveryDetails[0]?.address} | {deliveryDetails[0]?.city} - {deliveryDetails[0]?.state}</Text>
              <Text fontSize={14} mb='1'>{deliveryDetails[0]?.tel}</Text>
              <Text fontSize={14} mb='1'>Default Address</Text>
            </Box>
          </Stack>
          <Box display='flex' alignItems='center' gap={2}>
            <Text color='#00BFB2'>Edit</Text>
            <EditIcon color='#00BFB2' />
          </Box>
        </Stack>
      </Box>
      {/* <Button bg='#00BFB2' fontSize={13} mb='4' fontWeight='medium' color='white'><AddIcon mr='2' /> ADD ADDRESS</Button> */}
      <Divider />
    </Box>
  )
}

export default DeliveryDetails