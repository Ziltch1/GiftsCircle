import { Box, Stack, Divider } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader'
import DeliveryDetailsFooter from './subpages/DeliveryDetailsFooter'
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm'
import CartSummary from './subpages/CartSummary'
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard'
import BackButton from '../../../components/Buttons/BackButton'
import { GetDeliveryDetailsApi } from '../../../redux/axios/apis/events'
import { useSelector } from 'react-redux'

const Index = ({setShowCheckout}) => {
  const [deliveryDetails, setDeliveryDetails] = useState([])
  const {user} = useSelector(state => state.user)

  const getDeliveryDetails = async() => {
    try {
      const response = await GetDeliveryDetailsApi(user.id)
      const data = await response.data
      setDeliveryDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
   getDeliveryDetails()
  }, [])
  const handleClick = () => {
    setShowCheckout(false);
  }

  console.log(deliveryDetails);

  return (
    <Box w='80%' mx='auto' my='8'>
      <BackButton action={handleClick} />
        <Stack direction={{base: 'column', md: 'row', lg: 'row'}} justifyContent='space-between' mt='5'>
            <Box bg='white' w={{base: '100%', lg: '65%'}} borderRadius={5} p='4'>
                <DeliveryDetailsHeader />
                <Divider />
                {!deliveryDetails ? <DeliveryDetailsCard /> : <DeliveryDetailsForm />}
                {/* <Divider /> */}
                <DeliveryDetailsFooter />
            </Box>
            
            <Box w={{base: '100%', lg: '30%'}}>
                <CartSummary />
            </Box>
        </Stack>
    </Box>
  )
}

export default Index