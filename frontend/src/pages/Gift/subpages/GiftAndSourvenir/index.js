import React, {useState, useEffect} from 'react'
import Sourvenir from './subpages/Sourvenir'
import { Box } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { GetUserSourvenirApi } from '../../../../redux/axios/apis/sourvenir'
import Gift from './subpages/Gift'
import { GetUserGiftApi } from '../../../../redux/axios/apis/gift'

const Index = ({sourvenir, gifts}) => {

    const [newData, setNewData] = useState([]);
    const [newGift, setNewGift] = useState([]);
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


    const getUserGift = async () => {
      try {
        const response = await GetUserGiftApi(user.id);
        const data = response.data;
        setNewGift(data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getUserSourvenir();
      getUserGift();
    }, [user]);

  return (
    <Box>
        <Sourvenir newData={newData} sourvenir={sourvenir} />
        <Gift gifts={gifts} newGift={newGift} />
    </Box>
  )
}

export default Index