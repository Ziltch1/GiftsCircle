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
    Text, Heading, Textarea, Input, FormLabel, Checkbox
} from '@chakra-ui/react'

const Fundraising = ({setOpenDrawer}) => {
  const { isOpen, onOpen, onClose } = useDisclosure({defaultIsOpen: true})
  const btnRef = React.useRef()
  const closeModal = () => {
    setOpenDrawer(false)
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

                  <DrawerBody mt='7'>
                      <Box fontSize={'12px'} mb='5'>
                          <FormLabel fontSize={'14px'} fontWeight='semibold'>Fundraising title</FormLabel>
                          <Input type='text' placeholder='e.g  funds for honeymoon' fontSize={'12px'} bg='#F4F4F4'  />
                      </Box>
                      <Box fontSize={'13px'} mb='5'>
                          <FormLabel fontSize={'14px'} fontWeight='semibold'>Tell your story / Descripe the Event</FormLabel>
                          <Textarea placeholder='Tell your readers why you need their help and what you plan to use your donations for.' size='lg' fontWeight='medium' h='100px' fontSize='11px' bg='#F4f4f4' />
                      </Box>
                      <Box fontSize={'13px'} mb='5'>
                          <FormLabel fontSize={'14px'} fontWeight='semibold'>Upload images</FormLabel>
                          <FormLabel htmlFor='upload' w='100%' h='70px' bg='#f4f4f4' borderRadius={5} display='flex' justifyContent='center' alignItems='center '>
                              <Text fontSize={11} color='#A8A8A8'>Drag and drop files or Click to Browse</Text>
                              <Input type='file' id='upload' display='none' />
                          </FormLabel>
                      </Box>
                      
                      <Box fontSize={'13px'} mb='5'>
                          <FormLabel fontSize={'14px'} fontWeight='semibold'>Enter amount</FormLabel>
                          <Input type='text' placeholder='e.g dayo.abdullahi@gmail.com' fontSize={'12px'} bg='#F4F4F4' />
                      </Box>

                      <Box fontSize={'13px'} mb='5'>
                          <Checkbox colorScheme='green'><Text fontSize={12}>I agree to Event circle’s Terms and Privacy Policy on raising funds.</Text></Checkbox>
                      </Box>
                  </DrawerBody>

                  <DrawerFooter>
                      <Button variant='outline' mr={3} onClick={onClose} color='white' bg='#00BFB2' fontWeight='medium' fontSize='13px'>
                          Send message
                      </Button>
                  </DrawerFooter>

              </DrawerContent>
          </Drawer>
      </>
  )
}

export default Fundraising