import React, { useState } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerFooter,
  useDisclosure,
  Box,
  Text,
  Heading,
  Flex,
  Image,
  Button,
} from '@chakra-ui/react';
import ContributionModal from '../../ContributionModal';

const ComplimentaryModal = ({ setOpenDrawer, data }) => {
  const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={closeModal} />

          <DrawerHeader>
            <Heading fontWeight="medium" fontSize="25px" mb="2">
              Add complimentary Gift (optional)
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="space-between" flexWrap="wrap">
              {data.map(ele => (
                <GiftCard gift={ele} key={data.indexOf(ele)} />
              ))}
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={closeModal}
              fontSize={13}
              fontWeight="medium"
              w="150px"
            >
              Skip
            </Button>
            <Button
              fontSize={13}
              color="white"
              ml="5"
              fontWeight="medium"
              w="150px"
              bg="#00BFB2"
            >
              Proceed
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const GiftCard = ({ gift }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal && (
        <ContributionModal
          setOpenModal={setOpenModal}
          contribute={gift.enableContribution}
        />
      )}
      <Box
        w="285px"
        minH="250px"
        bg="white"
        p="2.5"
        borderRadius={10}
        boxShadow="sm"
        mb="5"
        cursor="pointer"
        key={gift?.id}
      >
        <Image
          src={gift?.image}
          w="279"
          h="142px"
          borderRadius={10}
          alt="gift item image"
          display="block"
          mx="auto"
          mb="2.5"
          //   onClick={() => openDrawer(gift)}
        />
        <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
          {gift?.title}
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="#27272E" fontWeight={600} fontSize={18}>
            ₦ {gift?.amount}
          </Text>
          <Button
            fontSize={13}
            fontWeight={500}
            //   bg={addedGiftItems.includes(gift?.id) ? 'grey' : '#00BFB2'}
            bg="#00BFB2"
            color="white"
            w="129px"
            h="40px"
            onClick={() => setOpenModal(true)}
            //   onClick={() => AddGift(gift?.id)}
            id={gift?.id}
          >
            Purchase
            {/* {addedGiftItems.includes(gift?.id) ? 'Added' : 'Add to list'} */}
          </Button>
        </Flex>
      </Box>
    </>
  );
};
export default ComplimentaryModal;
