import React from 'react';
import { Stack, Skeleton } from '@chakra-ui/react';

const SkeletonLoader = () => {
  return (
    <Stack mt="5" spacing="30px">
      <Skeleton height="50px" />
      <Skeleton height="50px" />
      <Skeleton height="50px" />
    </Stack>
  );
};

export default SkeletonLoader;
