import React, {useState, useEffect} from 'react'
import MarketplaceHeader from './subpages/MarketplaceHeader';
import { Box } from '@chakra-ui/react'
import Asoebi from './subpages/Asoebi';
import Sourvenirs from './subpages/Sourvenirs';
import Gifts from './subpages/Gifts';
import { GetSourvenirApi } from '../../../redux/axios/apis/sourvenir';
import { GetAsoebiItemsApi } from '../../../redux/axios/apis/asoebi';

const Index = ({newEvent}) => {
  const [navPosition, setNavPosition] = useState(0);
  const [sourvenir, setSourvenir] = useState([]);
  const [asoebi, setAsoebi] = useState([]);

  const getSourvenirs = async() => {
    try {
      const res = await GetSourvenirApi();
      const data = await res.data;
      setSourvenir(data);
    } catch (error) {
      console.log(error);
    }
  }


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
    getSourvenirs();
    getAsoebis();
  }, [])

  return (
    <Box>
      <MarketplaceHeader navPosition={navPosition} setNavPosition={setNavPosition} />
      <Box>
        {navPosition === 0 && <Asoebi data={asoebi} newEvent={newEvent} />}
        {navPosition === 1 && <Gifts />}
        {navPosition === 2 && <Sourvenirs data={sourvenir} />}
      </Box>
    </Box>
  )
}

export default Index