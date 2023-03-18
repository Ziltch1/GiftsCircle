import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Box,
  Text, Heading,Image, Flex
} from '@chakra-ui/react'
import mainImg from '../../../../assets/mainImg.svg'
import otherImg from '../../../../assets/smallImg.svg'

const GiftDetails = ({setOpenGiftDetails}) => {

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true })
  const btnRef = React.useRef()
  const closeModal = () => {
    setOpenGiftDetails(false)
  }

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='lg'
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={closeModal} />

          {/* <DrawerHeader>
            <Heading fontWeight='medium' fontSize='25px' mb='2'>Gift List (25)</Heading>
            <Text fontWeight='medium' fontSize='14px'>Find all the gifts you have added here...</Text>
          </DrawerHeader> */}

          <DrawerBody mt='16' mb='8'>
            <Box w='600px'>

              <Box border='1px solid lightgray' p='5' borderRadius={5} mb='5'>
                <Image src={mainImg} display='block' mx='auto' />
              </Box>
              <Box mb='8'>
                <Flex justifyContent='space-between'>
                  <Box w='140px' h='129px' borderRadius={10} bg='#F5F5F5'>
                    <Image src={otherImg} w='140px' h='129px' borderRadius={10} />
                  </Box>
                  <Box w='140px' h='129px' borderRadius={10} bg='#F5F5F5'>
                    {/* <Image src={otherImg} w='140px' h='129px' borderRadius={10} /> */}
                  </Box>
                  <Box w='140px' h='129px' borderRadius={10} bg='#F5F5F5'>
                    {/* <Image src={otherImg} w='140px' h='129px' borderRadius={10} /> */}
                  </Box>
                  <Box w='140px' h='129px' borderRadius={10} bg='#F5F5F5'>
                    {/* <Image src={otherImg} w='140px' h='129px' borderRadius={10} /> */}
                  </Box>
                </Flex>
              </Box>

              <Box mb='14'>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Heading fontSize={24} fontWeight={600}>₦ 155,000</Heading>
                  <Button fontSize={13} fontWeight={500} color='white' bg='#00BFB2' w='147px' h='40px'>Add to list</Button>
                </Flex>
              </Box>

              <Box>
                <Heading fontSize={24} fontWeight={600} mb='7'>Product details</Heading>
                <Text>
                  The Redmi Note 11S is equipped with a 108MP AI quad camera system, stunning ultra-clear images, an 8MP ultra-wide-angle camera that expands your perspective with a 118-degree viewing angle, a 2MP macro camera that captures fine details from close proximity, and a 2MP depth sensor responsible for capturing more natural portrait shots. It has a 16MP Selfie Camera] Front camera that gives natural-looking selfies, capturing those beautiful moments of life with the ultimate visuals.

                  The Redmi Note 11S features a 90Hz FHD+ AMOLED Dot Display. Along with the smooth sliding sensation on your fingertips, the AMOLED display software features also offer the ultimate energetic, immersive, and eye-catching visual experience.

                  This phone is equipped with a 5000mAh massive battery, and 33W Pro fast charging which effectively improves charging efficiency, and shortens charging time by 26%, and with Mi FC + MMT technology, it also makes the charging process more stable and efficient.

                  It also features an incredible octa-core MediaTek Helio G96. The MediaTek Helio G96 enables the amazing 108MP camera and smooth as butter 90Hz refresh rate, giving you crisp shots as well as powerful gaming experiences.

                  Some other specs include; Dual SIM (Nano-SIM, dual stand-by), IP53, dust and splash protection.
                </Text>
              </Box>
            </Box>
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose} color='white' bg='#00BFB2' fontWeight='medium' fontSize='13px'>
              Send message
            </Button>
          </DrawerFooter> */}

        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default GiftDetails