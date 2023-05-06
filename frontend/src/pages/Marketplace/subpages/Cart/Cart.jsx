import React, {useState, useEffect} from 'react'
import CartItem from './CartItem'
import BackButton from '../../../../components/Buttons/BackButton'
import { Box, Heading, Text, Flex, Divider, Button } from '@chakra-ui/react'
import CloseModal from '../../CloseModal'
import { GetAddedAsoebiItemsApi } from '../../../../redux/axios/apis/asoebi'

const Cart = ({setShowCart, eventId}) => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const items = [1,2,3,4,5,6,7,8]

  const getAddedAsoebi = async() => {
    try {
      const response = await GetAddedAsoebiItemsApi(eventId);
      const data = response.data;
      setData(data)
    } catch (error) {
      console.log(error);
    } 
  }
  useEffect(() => {
    getAddedAsoebi();
  }, [])
  
  return (
    <>
    {showModal && <CloseModal setShowModal={setShowModal} />}
    <Box minH='600px' w='95%' mx='auto' pt='8' mb='10'>
      <BackButton action={() => setShowCart(false)} />
      <Box mt='3' mb='10'>
        <Heading mb='2' fontWeight={600} fontSize={30}>Your Cart</Heading>
        <Text color='#717171' fontSize={14}>This is where you can buy some things you need for your event for your self</Text>
      </Box>

      <Box>
        <Flex justifyContent='space-between' alignItems='flex-start'>
          <Box w='750px' bg='white' p='5' borderRadius={5} minH='400px' boxShadow='sm' border='1px solid #EEEEEE'>
            {items.map((item) => <CartItem setShowModal={setShowModal} />)}
          </Box>
          <Box w='350px' bg='white' borderRadius={5} minH='200px' boxShadow='sm' border='1px solid #EEEEEE'>
            <Heading fontSize={18} p='5' fontWeight={600}>Cart summary</Heading>
            <Divider />
            <Box p='5'>
              <Box mb='7'>
                <Text fontSize={13} fontWeight={400} color='#8C8C8C' mb='2'>Subtotal</Text>
                <Heading fontSize={18} fontWeight={600} mb='2'>₦ 285,455</Heading>
                <Text fontSize={13} fontWeight={400} color='#555555'>Delivery fees not included yet.</Text>
              </Box>
              <Box>
                <Button w='100%' fontSize={13} fontWeight={400} color='white' bg='#00BFB2'>Checkout (<strong>₦ 285,455</strong>)</Button>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
    </>
  )
}

export default Cart