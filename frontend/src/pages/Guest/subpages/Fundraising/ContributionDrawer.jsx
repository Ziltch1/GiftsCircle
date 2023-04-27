import React, { useState, useEffect } from 'react';
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
    Box,
    Text,
    Heading,
    Textarea,
    Input,
    FormLabel,
    Checkbox,
    FormControl,
} from '@chakra-ui/react';
import axiosInstance from '../../../../redux/axios/axios';
import { setFundRaising } from '../../../../redux/features/events/eventSlice';
import { dispatch } from '../../../../redux/store';

const ContributionDrawer = ({ setShowDrawer, id, fundRaising }) => {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDesciption] = useState('');
    const [image, setImage] = useState(null);
    const [btnDisabled, setBtnDisabled] = useState(true);
    const btnRef = React.useRef();

    const closeModal = () => {
        setShowDrawer(false);
    };

    const handleClick = async () => {
        const formData = new FormData();
        formData.append('eventId', id);
        formData.append('amount', amount);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        if (!btnDisabled) {
            try {
                const res = await axiosInstance.post('/fundRaising/create', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                dispatch(setFundRaising(res.data));
                setShowDrawer(false);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        if (amount === '' || title === '' || description === '' || image === '') {
            setBtnDisabled(true);
        } else {
            setBtnDisabled(false);
        }
    }, [amount, title, description, image]);

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size="md"
                closeOnOverlayClick={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton onClick={closeModal} />

                    <DrawerHeader>
                        <Heading fontWeight="medium" fontSize="22px" lineHeight={8} pr='4'>
                            <strong>Donating to</strong> {fundRaising?.title}
                        </Heading>
                    </DrawerHeader>

                    <FormControl isRequired>
                        <DrawerBody mt="4">
                            <Box fontSize={'12px'} mb="5">
                                <FormLabel fontSize={'13px'} fontWeight="semibold">
                                    First name
                                </FormLabel>
                                <Input
                                    type="text"
                                    color="#000"
                                    fontSize="14px"
                                    placeholder="e.g  John"
                                    bg="#F4F4F4"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Box>
                            <Box fontSize={'13px'} mb="5">
                                <FormLabel fontSize={'13px'} fontWeight="semibold">
                                    Last name
                                </FormLabel>
                                <Input
                                    color="#000"
                                    fontSize="14px"
                                    placeholder="e.g Joshua"
                                    fontWeight="normal"
                                    bg="#F4f4f4"
                                    value={description}
                                    onChange={e => setDesciption(e.target.value)}
                                />
                            </Box>
                            <Box fontSize={'13px'} mb="5">
                                <FormLabel fontSize={'13px'} fontWeight="semibold">
                                    Email
                                </FormLabel>
                                    <Input
                                        type="email"
                                        color="#A8A8A8"
                                        fontSize="14px"
                                        id="email"
                                        fontWeight="normal"
                                        bg="#F4f4f4"
                                        placeholder='e.g john@gmail.com'
                                        onChange={e => setImage(e.target.value)}
                                    />
                            </Box>

                            <Box fontSize={'13px'} mb="5">
                                <FormLabel fontSize={'13px'} fontWeight="semibold">
                                    Phone number
                                </FormLabel>
                                <Input
                                    type="text"
                                    color="#A8A8A8"
                                    fontSize="14px"
                                    id="email"
                                    fontWeight="normal"
                                    bg="#F4f4f4"
                                    placeholder='e.g +234757583856'
                                    onChange={e => setImage(e.target.value)}
                                />
                            </Box>


                            <Box fontSize={'13px'} mb="5">
                                <FormLabel fontSize={'13px'} fontWeight="semibold">
                                    Amount to donate
                                </FormLabel>
                                <Input
                                    type="number"
                                    color="#000"
                                    fontSize="14px"
                                    placeholder="e.g 550000"
                                    bg="#F4F4F4"
                                    value={amount}
                                    onChange={e => setAmount(e.target.value)}
                                />
                            </Box>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button
                                variant="outline"
                                onClick={() => handleClick()}
                                mr={3}
                                color="white"
                                bg="#00BFB2"
                                fontWeight="medium"
                                fontSize="13px"
                                disabled={btnDisabled}
                                opacity={btnDisabled ? '0.5' : '1.0'}
                                w='100%'
                            >
                                Contribute (₦ {amount})
                            </Button>
                        </DrawerFooter>
                        <Text fontSize={12} textAlign='center'>Payment securely processed by Paystack</Text>
                    </FormControl>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default ContributionDrawer;
