import React, {useState} from 'react'
import {
    Text,
    Heading,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
    Button,
    Image,
    useDisclosure,
    Flex,
    FormLabel,
    Input, Spinner
} from '@chakra-ui/react';
import errorImg from '../../../assets/errorImg.svg';
import { Link } from 'react-router-dom';
import { UpdateDeliveryDetailsApi } from '../../../../redux/axios/apis/delivery';
import { useSelector } from 'react-redux';

const EditAddressModal = ({ setConfirmEditAddress, setEditAddress, deliveryAddress, getDeliveryAddress, setIsEdited }) => {
    const { onClose, isOpen } = useDisclosure({ defaultIsOpen: true });
    const [address, setAddress] = useState('');
    const {user} = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setConfirmEditAddress(false)
        setEditAddress(false)
    }

    const formData = {
        firstname: deliveryAddress?.firstname,
        lastname: deliveryAddress?.lastname,
        address: address,
        info: deliveryAddress?.info,
        lga: deliveryAddress?.lga,
        state: deliveryAddress?.state,
        tel: deliveryAddress?.tel,
        tel2: deliveryAddress?.tel2,
        userId: user?.id
    }

    const updateAddress = async () => {
        setLoading(true);
        try {
            await UpdateDeliveryDetailsApi(formData, deliveryAddress.id)
            await getDeliveryAddress();
            setConfirmEditAddress(false);
            setEditAddress(false);
            setLoading(false);
            setIsEdited(true)
        } catch (error) {
          console.log(error);   
          setLoading(false);
        }
    }

    return (
        <Box>
            <Modal
                isCentered
                closeOnOverlayClick={false}
                onClose={onClose}
                isOpen={isOpen}
            >
                <ModalOverlay />
                <ModalContent py="4" w="450px" h="auto">
                    <ModalCloseButton onClick={handleClick} />
                    <ModalBody>
                        <Image src={errorImg} mb="3" display="block" mx="auto" />

                        <Heading mb="4" textAlign="center" fontWeight='medium' fontSize={20}>
                            Update your delivery address
                        </Heading>


                        <Flex direction="column" w="85%" mx="auto">
                            <FormLabel fontSize={14}>Enter your preferred delivery address</FormLabel>
                            <Input
                                type='text'
                                mb="3"
                                bg='#F4F4F4'
                                fontSize={14}
                                color='black'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder='e.g 123, Ikorodu Road, Lagos, Nigeria'
                            />

                            <Button
                                fontSize={14}
                                fontWeight="medium"
                                mb='3'
                                bg='#00BFB2'
                                color='white'
                                onClick={updateAddress}
                            >
                                {loading ? <Spinner /> : 'Update Address'}
                            </Button>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default EditAddressModal