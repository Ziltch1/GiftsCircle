import React, {useState, useEffect} from 'react'
import Sourvenir from './subpages/Sourvenir'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { GetUserSourvenirApi } from '../../../../redux/axios/apis/sourvenir'
import Gift from './subpages/Gift'

const Index = ({sourvenir, gifts}) => {

    const [newData, setNewData] = useState([]);
    const { user } = useSelector(state => state.user);

    const getUserSourvenir = async () => {
      try {
        const response = await GetUserSourvenirApi(user.id);
        const data = response.data;
        setNewData(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUserSourvenir();
    }, [user]);

  return (
    <Box>
        <Sourvenir newData={newData} sourvenir={sourvenir} />
        <Gift gifts={gifts} />
    </Box>
  )
}

export default Index