import { Box, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { GetEventApi } from '../../redux/axios/apis/events';
import { GetUserApi } from '../../redux/axios/apis/user';
import ErrorHandler from '../../redux/axios/Utils/ErrorHandler';
import Join from './subpages/Join';

const JoinEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const GetEvent = async id => {
    try {
      const res = await GetEventApi(id);
      if (res.data) {
        setEvent(res.data);
        const res2 = await GetUserApi(res.data.user_id);

        setUser(res2.data.user);
        setLoading(false);
      }
    } catch (error) {
      console.log(ErrorHandler(error));
    }
  };
  useEffect(() => {
    GetEvent(id);
  }, [id]);

  return (
    <Box>
      {/* <Header /> */}
      <Box display="flex" alignItems="center" justifyContent="center" h="90vh">
        {loading ? (
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        ) : (
          <Join event={event} user={user} />
        )}
      </Box>
    </Box>
  );
};

export default JoinEvent;
