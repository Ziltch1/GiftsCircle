import React from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Flex,
} from '@chakra-ui/react';

const AlertBox = ({ message, setError }) => {
  const onCloseHandler = () => {
    setError(null);
  };

  setTimeout(() => {
      setError(null)
  }, 5000)

  return (
    <Alert status="error">
      <Flex justifyContent="space-between" alignItems="center" width="100%">
        <Flex>
          <AlertIcon />
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Flex>

        <CloseButton onClick={onCloseHandler} />
      </Flex>
    </Alert>
  );
};

export default AlertBox;
