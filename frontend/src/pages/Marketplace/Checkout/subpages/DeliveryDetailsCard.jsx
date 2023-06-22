import { EditIcon, AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Radio,
  Divider,
  RadioGroup,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const DeliveryDetails = ({ data, setShowDeliveryForm }) => {
  const [checked, setChecked] = useState(1);
  return (
    <Box w="100%">
      <RadioGroup onChange={setChecked} value={checked}>
        {data.map((ele, index) => (
          <DeliveryItem data={ele} checked={checked} index={index} />
        ))}
      </RadioGroup>

      <Button
        bg="#00BFB2"
        fontSize={13}
        mb="4"
        fontWeight="medium"
        color="white"
        onClick={() => setShowDeliveryForm(true)}
      >
        <AddIcon mr="2" /> ADD ADDRESS
      </Button>
      <Divider />
    </Box>
  );
};

const DeliveryItem = ({ data, index, checked }) => {
  return (
    <Box value={index} my="3">
      <Heading fontSize={14} fontWeight="semibold" mb="2">
        ADDRESS BOOK {index + 1}
      </Heading>
      <Box
        mb="4"
        border={index === checked ? '2px solid #00BFB2' : '2px solid lightgray'}
        borderRadius={7}
        p="5"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={3} alignItems="flex-start">
            <Radio value="1" colorScheme="teal" />
            <Box>
              <Heading fontSize={15} mb="1" textTransform="capitalize">
                {data.firstname} {data.lastname}
              </Heading>
              <Text fontSize={14} mb="1">
                {data.address +
                  ' ' +
                  data.info +
                  ' ' +
                  '|' +
                  ' ' +
                  data.state +
                  ' ' +
                  data.lga +
                  ' '}
              </Text>
              <Text fontSize={14} mb="1">
                {data.tel}
              </Text>
              {index === 0 && (
                <Text fontSize={14} mb="1">
                  Default Address
                </Text>
              )}
            </Box>
          </Stack>
          <Box display="flex" alignItems="center" gap={2}>
            <Text color="#00BFB2">Edit</Text>
            <EditIcon color="#00BFB2" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default DeliveryDetails;
