import React, {useState, useEffect} from 'react'
import AsoebiHeader from './subpages/AsoebiHeader';
import { Box } from '@chakra-ui/react'
import Asoebi from './subpages/Asoebi';
import { GetAsoebiItemsApi } from '../../../redux/axios/apis/asoebi';

const Index = ({newEvent}) => {
  const [navPosition, setNavPosition] = useState(0);
  const [asoebi, setAsoebi] = useState([]);

  const getAsoebis = async () => {
    try {
      const res = await GetAsoebiItemsApi(newEvent.id);
      const data = await res.data;
      setAsoebi(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsoebis();
  }, [])

  return (
    <Box>
      <AsoebiHeader navPosition={navPosition} setNavPosition={setNavPosition} />
      <Box>
        <Asoebi data={asoebi} newEvent={newEvent} />
      </Box>
    </Box>
  )
}

export default Index