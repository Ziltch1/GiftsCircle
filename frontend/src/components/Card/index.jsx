 import { Box, Flex, Button, Text, Image, Progress } from '@chakra-ui/react';
import DetailsDrawer from './component/Details';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const DisplayCard = ({ id, data, disabled, action, text, purchased, increment, contribute, amountPaid,}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const percentagePaid = ((amountPaid / data?.amount) * 100);
  
  return (
    <>
      <Flex>
        <DetailsDrawer
          data={data}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />
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
            src={data?.image}
            w="100%"
            h="142px"
            borderRadius={10}
            alt="gift item image"
            display="block"
            mx="auto"
            mb="2.5"
            objectFit="cover"
            onClick={() => setModalOpen(true)}
          />
          <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
            {data?.title}
          </Text>
          <Flex alignItems="center" justifyContent="space-between" mb='3'>
            <Text color="#27272E" fontWeight={600} fontSize={18}>
              ₦ {increment ? data?.amount + increment : data?.amount}
            </Text>
            <Button
              fontSize={13}
              fontWeight={500}
              // bg="#00BFB2"
              bg={disabled | purchased ? 'grey' : '#00BFB2'}
              color="white"
              w="129px"
              h="40px"
              onClick={() => (disabled | purchased ? null : action(data?.id))}
              id={id}
            >
              {disabled
                ? purchased
                  ? 'Purchased'
                  : 'Added to List'
                : purchased
                ? 'Purchased'
                : text}
            </Button>
          </Flex>

          {contribute && 
            <>
              <Progress colorScheme='teal' borderRadius={12} value={percentagePaid} mb='2' />
              <Flex justifyContent='space-between'>
                <Text fontSize={14}>₦{amountPaid}</Text>
                <Text fontSize={14}>₦{data?.amount}</Text>
              </Flex>
            </>
          }
        </Box>
      </Flex>
    </>
  );
};

export default DisplayCard;
