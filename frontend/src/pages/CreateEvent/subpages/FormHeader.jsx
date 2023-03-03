import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FormHeader = ({step}) => {
  const navigate = useNavigate();
  return (
    <Box w="80%" mx="auto" mb="3">
      <Flex justifyContent="space-between" alignItems="center">
        <Box>
          <Flex alignItems="center" gap={6}>
            <CloseIcon
              fontSize={10}
              onClick={() => navigate('/dashboard')}
              cursor="pointer"
            />
            <Heading fontWeight="medium" fontSize="20px">
              Create Event
            </Heading>
          </Flex>
        </Box>

        <Box fontSize={14}>Step {step}/6 - Basic Info</Box>
      </Flex>
    </Box>
  );
};

export default FormHeader;
