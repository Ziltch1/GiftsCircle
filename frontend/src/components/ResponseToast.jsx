import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { dispatch } from '../redux/store';
import { createResponse } from '../redux/utils/UtilSlice';

const Response = () => {
  const toast = useToast();
  const { response } = useSelector(state => state.util);

  useEffect(() => {
    if (response.message !== null) {
      let id = response.message;
      if (!toast.isActive(id)) {
        toast({
          title: response.title,
          description: response.message,
          status: response.type === 'Error' ? 'error' : 'success',
          duration: 9000,
          isClosable: true,
        });

        dispatch(
          createResponse({
            type: null,
            message: null,
            title: null,
          })
        );
      }
    }
  }, [response]);

  return <></>;
};

export default Response;
