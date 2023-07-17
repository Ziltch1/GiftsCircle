import React, {useState, useEffect} from 'react'
import DeliveriesHeader from './components/DeliveriesHeader'
import Search from '../../components/Search/Search'
import { Box } from '@chakra-ui/react'
import OpenDeliveries from './subpages/OpenDeliveries'
import ClosedDeliveries from './subpages/ClosedDeliveries'
import { GetUserDeliveryTransApi } from '../../redux/axios/apis/delivery'
import { useSelector } from 'react-redux'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  const [deliveries, setDeliveries] = useState([])
  const {user} = useSelector(state => state.user)

  const getUserDeliveryApi = async () => {
    try {
      const res = await GetUserDeliveryTransApi(user.id)
      const data = await res.data
      setDeliveries(data);
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUserDeliveryApi()
  }, [user])

  return (
    <Box bg='#F5F5F5' h='100%' pb='12'>
        <Box w='85%' mx='auto'>
              <DeliveriesHeader navPosition={navPosition} setNavPosition={setNavPosition} />
              <Search />
              <Box>
                {navPosition === 0 && <OpenDeliveries deliveries={deliveries} />}
                {navPosition === 1 && <ClosedDeliveries />}
              </Box>
        </Box>
    </Box>
  )
}

export default Index