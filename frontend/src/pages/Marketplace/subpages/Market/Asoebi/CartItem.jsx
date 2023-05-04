import { Box, Text, Image, Button, Flex, Modal, ModalBody, ModalContent, ModalCloseButton, ModalOverlay, Heading, Input, useDisclosure, FormLabel} from '@chakra-ui/react'
import React from 'react'
import cartItemImg from '../../../../assets/giftItemImage.svg'
import { DeleteIcon, MinusIcon, AddIcon } from '@chakra-ui/icons'

const CartItem = ({setShowModal, item, data, setData}) => {
  const removeItem = (id) => {
    const filteredArray = data.filter(obj => obj.id !== id);
    setData(filteredArray);
  }

  console.log(item);
  return (
    <Box w='100%' h='auto' bg='#FAFAFA' p='4' mb='5'>
      <Flex alignItems='center'>
        <Box w='20%'>
          <Image src={item.image} h='100px' w='120px' objectFit='cover' borderRadius={5} />
        </Box>

        <Box w='80%'>

          <Box mb='2' display='flex' justifyContent='space-between'>
            <Text w='75%' fontWeight={600} fontSize={16}>{item.details}</Text>
            <Text fontWeight={600} fontSize={16}>₦ {item.amount}</Text>
          </Box>

          <Box mb='2'>
            <Button fontSize={14} >Markup Asoebi?</Button>
          </Box>

          <Box display='flex' justifyContent='space-between'>
            <Text color='#F5222D' fontSize={14} cursor='pointer' onClick={() => removeItem(item.id)}><DeleteIcon/> Remove from list</Text>
          </Box>

        </Box>
      </Flex>
    </Box>
  )
}

export default CartItem




export const ContributionAmount = ({ setContribution, setOpenModal }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const closeModal = () => {
    // setOpenModal(false)
    setContribution(false);
  };
  return (
    <Box>
      <Modal
        isCentered
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent py="4" w="380px" h="auto">
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            <Heading
              mb="5"
              fontWeight="semibold"
              fontSize={24}
              textAlign="center"
            >
              How much do you want to contribute?
            </Heading>
            <Flex w="70%" mx="auto" justifyContent="space-between" mb="5">
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
              >
                1,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
              >
                5,000
              </Button>
              <Button
                bg="#CCF2F0"
                fontSize={13}
                fontWeight="medium"
                color="#00BFB2"
                borderRadius="100px"
              >
                10,000
              </Button>
            </Flex>
            <Box mb="5">
              <FormLabel fontSize={14}>Type amount here</FormLabel>
              <Input type="text" placeholder="Amount" fontSize={14} />
            </Box>
            <Box textAlign="center">
              <Button
                mb="3"
                w="100%"
                bg="#00BFB2"
                fontSize={14}
                fontWeight="medium"
                color="white"
              >
                Proceed
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
