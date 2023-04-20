import React, {useState} from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    useDisclosure,
    Image,
    Box,
    Text, Heading, Textarea, Input, FormLabel, Checkbox, FormControl,
} from '@chakra-ui/react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { CreateFundraisingApi } from '../../../../redux/axios/apis/fundraising'

const Fundraising = ({setOpenDrawer}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true});
  const {newEvent} = useSelector(state => state.event);
  const {token} = useSelector(state => state.auth)
  const [amount, setAmount] = useState('')
  const btnRef = React.useRef();

  const closeModal = () => {
    setOpenDrawer(false)
  }

  const formData = {eventId: newEvent.id, amount: amount};

  const handleClick = async () => {
    if(amount){
      try { 
        const res = await CreateFundraisingApi(formData);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
      <>
          <Drawer
              isOpen={isOpen}
              placement='right'
              onClose={onClose}
              finalFocusRef={btnRef}
              size='md'
              closeOnOverlayClick={false}
          >
              <DrawerOverlay />
              <DrawerContent>
                  <DrawerCloseButton onClick={closeModal} />

                  <DrawerHeader>
                      <Heading fontWeight='medium' fontSize='25px'>Start a fundraising</Heading>
                  </DrawerHeader>

                  <FormControl isRequired>
                      <DrawerBody mt='4'>
                          <Box fontSize={'12px'} mb='5'>
                              <FormLabel fontSize={'13px'} fontWeight='semibold'>Fundraising title</FormLabel>
                              <Input type='text' color='#A8A8A8' placeholder='e.g  funds for honeymoon' fontSize={'12px'} bg='#F4F4F4' />
                          </Box>
                          <Box fontSize={'13px'} mb='5'>
                              <FormLabel fontSize={'13px'} fontWeight='semibold'>Tell your story / Descripe the Event</FormLabel>
                              <Textarea color='#A8A8A8' placeholder='Tell your readers why you need their help and what you plan to use your donations for.' size='lg' fontWeight='medium' h='100px' fontSize='11px' bg='#F4f4f4' />
                          </Box>
                          <Box fontSize={'13px'} mb='5'>
                              <FormLabel fontSize={'13px'} fontWeight='semibold'>Upload images</FormLabel>
                              <FormLabel htmlFor='upload' w='100%' h='70px' bg='#f4f4f4' borderRadius={5} display='flex' justifyContent='center' alignItems='center '>
                                  <Text fontSize={11} color='#A8A8A8'>Drag and drop files or Click to Browse</Text>
                                  <Input type='file' color='#A8A8A8' id='upload' display='none' />
                              </FormLabel>
                          </Box>

                          <Box fontSize={'13px'} mb='5'>
                              <FormLabel fontSize={'13px'} fontWeight='semibold'>Enter amount</FormLabel>
                              <Input type='text' color='#A8A8A8' placeholder='e.g ₦ 587,500' fontSize={'12px'} bg='#F4F4F4' value={amount} onChange={(e) => setAmount(e.target.value)} />
                          </Box>

                          <Box fontSize={'13px'} mb='5'>
                              <Checkbox colorScheme='green' defaultChecked><Text fontSize={12}>I agree to Event circle’s Terms and Privacy Policy on raising funds.</Text></Checkbox>
                          </Box>
                      </DrawerBody>

                      <DrawerFooter>
                          <Button variant='outline' onClick={handleClick} mr={3} color='white' bg='#00BFB2' fontWeight='medium' fontSize='13px'>
                              Start fundraising
                          </Button>
                      </DrawerFooter>

                  </FormControl>
              </DrawerContent>
          </Drawer>
      </>
  )
}

export default Fundraising