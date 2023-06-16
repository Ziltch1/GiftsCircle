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

const DeliveryDetails = ({ data }) => {
  const [checked, setChecked] = useState(1);

  console.log(checked);
  return (
    <Box w="100%">
      <RadioGroup onChange={e => setChecked(e)} value={checked}>
        {data.map(ele => (
          <DeliveryItem data={ele} index={data.indexOf(ele) + 1} />
        ))}
      </RadioGroup>

      <Button
        bg="#00BFB2"
        fontSize={13}
        mb="4"
        fontWeight="medium"
        color="white"
      >
        <AddIcon mr="2" /> ADD ADDRESS
      </Button>
      <Divider />
    </Box>
  );
};



const DeliveryItem = ({ data, index }) => {
  return (
    <Box value={index}>
      <Heading fontSize={14} fontWeight="semibold" mb="2">
        ADDRESS BOOK {index}
      </Heading>
      <Box mb="4" border="2px solid lightgray" borderRadius={7} p="5">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack direction="row" spacing={3} alignItems="flex-start">
            <Radio colorScheme="teal" />
            <Box>
              <Heading fontSize={15} mb="1">
                JOSEPH GABRIEL
              </Heading>
              <Text fontSize={14} mb="1">
                {data.address +
                  ' ' +
                  data.city +
                  ' ' +
                  data.state +
                  ' ' +
                  data.country}
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
