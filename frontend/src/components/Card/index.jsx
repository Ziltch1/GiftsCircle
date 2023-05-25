import { Box, Flex, Button, Text, Image } from '@chakra-ui/react';
import DetailsDrawer from './component/Details';
import React, { useState } from 'react';

const DisplayCard = ({ id, data, disabled, action, text, purchased }) => {
  const [modalOpen, setModalOpen] = useState(false);

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
            src={data.image}
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
            {data.title}
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="#27272E" fontWeight={600} fontSize={18}>
              ₦ {data.amount}
            </Text>
            <Button
              fontSize={13}
              fontWeight={500}
              // bg="#00BFB2"
              bg={disabled | purchased ? 'grey' : '#00BFB2'}
              color="white"
              w="129px"
              h="40px"
              onClick={() => (disabled | purchased ? null : action(data.id))}
              id={id}
            >
              {disabled
                ? purchased
                  ? 'Purchased'
                  : 'Added to Cart'
                : purchased
                ? 'Purchased'
                : text}
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default DisplayCard;
