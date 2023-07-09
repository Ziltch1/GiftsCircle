import { EditIcon, AddIcon, DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  Stack,
  Button,
  Radio,
  Divider,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { DeleteDeliveryDetailsApi } from '../../../../../../redux/axios/apis/delivery';
import { dispatch } from '../../../../../../redux/store';
import { GetDeliveryDetails } from '../../../../../../redux/features/user/service';

const DeliveryDetails = ({
  data,
  setShowDeliveryForm,
  setSelectedDeliveryDetails,
}) => {
  const [checked, setChecked] = useState(-1);

  return (
    <Box w="100%">
      {data?.map((ele, index) => {
        return (
          <DeliveryItem
            key={index}
            data={ele}
            setChecked={setChecked}
            checked={index === checked}
            index={index}
            setSelectedDeliveryDetails={setSelectedDeliveryDetails}
            setShowDeliveryForm={setShowDeliveryForm}
          />
        );
      })}

      {/* <Button
        bg="#00BFB2"
        fontSize={13}
        mb="4"
        fontWeight="medium"
        color="white"
        onClick={() => setShowDeliveryForm(true)}
      >
        <AddIcon mr="2" /> ADD ADDRESS
      </Button> */}
      {/* <Divider /> */}
    </Box>
  );
};

const DeliveryItem = ({
  data,
  index,
  checked,
  setChecked,
  setSelectedDeliveryDetails,
  setShowDeliveryForm,
}) => {
  const DeleteDelivery = async id => {
    const res = await DeleteDeliveryDetailsApi(id);
    if (res.data) {
      dispatch(GetDeliveryDetails(data.userId));
    }
  };
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
            <Radio
              isChecked={checked}
              onClick={() => {
                setChecked(index);
                setSelectedDeliveryDetails(data);
              }}
              colorScheme="teal"
            />
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
          {/* <Box display="flex" alignItems="center" gap={2}>
            <EditIcon
              color="#00BFB2"
              onClick={() => {
                setSelectedDeliveryDetails(data);
                setShowDeliveryForm(true);
              }}
            />
            <DeleteIcon
              color="#00BFB2"
              onClick={() => {
                DeleteDelivery(data.id);
              }}
            />
          </Box> */}
        </Stack>
      </Box>
    </Box>
  );
};

export default DeliveryDetails;
