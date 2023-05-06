import {
  Box,
  Input,
  FormLabel,
  Text,
  Heading,
  Flex,
  FormControl,
  Image,
  Progress,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import BackButton from '../../../../components/Buttons/BackButton';
import galleryImage from '../../../../components/assets/gallery.svg';
import FormFooter from '../../components/FormFooter';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../redux/axios/axios';
import { dispatch } from '../../../../redux/store';
import { setNewEvent } from '../../../../redux/features/events/eventSlice';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';
import SuccessImg from '../../../assets/success.svg';
import finalImg from '../../../assets/newSuccess.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EventImageForm = ({ step, setStep }) => {
  const event = JSON.parse(localStorage.getItem('newEvent'));
  const { newEvent } = useSelector(state => state.event);
  const [image, setImage] = useState(event ? event.image : '');
  const [summary, setSummary] = useState(event ? event.summary : '');
  const [description, setDescription] = useState(
    event ? event.desc_summary : ''
  );
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const toast = useToast();

  //modules for react quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const uploadImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onprogress = event => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setProgress(progress);
      }
      setUploading(true);
    };
    reader.readAsDataURL(file);
    setImage(e.target.files[0]);
    const timer = setTimeout(() => {
      setIsUploaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  };

  const handleSubmit = async () => {
    const formBody = new FormData();
    formBody.append('summary', summary);
    formBody.append('desc_summary', description);
    formBody.append('image', image);
    formBody.append('id', newEvent.id);

    if (image && summary && description) {
      try {
        const res = await axiosInstance.post('/event/create2', formBody, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        localStorage.setItem('newEvent', JSON.stringify(res.data));
        dispatch(setNewEvent(res.data));
        setStep(step + 1);
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)));
      }
    } else {
      toast({
        title: 'Error!',
        description: 'Please fill all fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  const BackAction = () => {
    setStep(1);
  };

  return (
    <>
      <Box mt="8" h="100%" mb="28" maxW="750px" mx="auto">
        <Flex alignItems="start" justifyContent="space-between" flexWrap="wrap">
          <BackButton action={BackAction} />
          <Box maxW="500px" mx="auto" fontSize={14}>
            <Box mb="5">
              <Heading mb="2" fontSize="25px">
                Event Image
              </Heading>
              <Text color="#717171">
                This is the first image attendees will see at the top of your
                listing.
              </Text>
            </Box>
            <FormControl>
              <Box mb="8">
                <Box width="500px" height="260px" display="flex">
                  <FormLabel
                    mb="5"
                    htmlFor="upload"
                    w="500px"
                    position="relative"
                    h="260px"
                    backgroundImage={`url(${image})`}
                    backgroundRepeat="no-repeat"
                    backgroundSize="inherit"
                    border="1.5px solid lightgray"
                    borderRadius={5}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      id="upload"
                      display="none"
                      onChange={uploadImage}
                    />
                    {!isUploaded ? (
                      <Box>
                        {!uploading ? (
                          <Box
                            w="318px"
                            mx="auto"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            mb="5"
                          >
                            <Box>
                              <Image
                                src={galleryImage}
                                alt="event image"
                                display="block"
                                mx="auto"
                              />
                              <Text fontWeight="semibold" fontSize={13}>
                                Drag and drop your file here or{' '}
                                <strong style={{ color: '#00BFB2' }}>
                                  browse.
                                </strong>
                                <br />
                                Maximum of 25mb
                              </Text>
                            </Box>
                          </Box>
                        ) : (
                          <Box textAlign="center">
                            <Box mb="4">
                              {progress === 100 ? (
                                <Image src={SuccessImg} />
                              ) : (
                                <Spinner
                                  thickness="4px"
                                  speed="0.65s"
                                  emptyColor="gray.200"
                                  color="#00BFB2"
                                  size="xl"
                                />
                              )}
                            </Box>
                            <Text fontSize={13} textAlign="center">
                              {progress === 100
                                ? 'Completed...'
                                : 'Uploading your file...'}{' '}
                              {progress}%
                            </Text>
                            <Progress
                              width="500px"
                              height="4px"
                              value={progress}
                              position="absolute"
                              bottom="0"
                              left="0px"
                              colorScheme="teal"
                            />
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <Box textAlign="center">
                        <Image
                          src={finalImg}
                          diaplay="block"
                          mx="auto"
                          h="120px"
                          mb="-20px"
                        />
                        <Text mb="3">{image.name}</Text>
                        <FormLabel
                          bg="transparent"
                          w="190px"
                          h="40px"
                          borderRadius={5}
                          fontSize="14px"
                          htmlFor="upload"
                          color="white"
                          textAlign="center"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Text>Replace image</Text>
                        </FormLabel>
                      </Box>
                    )}
                  </FormLabel>
                </Box>

                <Box mb="7" mt="3">
                  <FormLabel fontWeight="semibold" fontSize={14}>
                    Summary of event
                  </FormLabel>
                  <Input
                    type="text"
                    value={summary}
                    onChange={e => setSummary(e.target.value)}
                    placeholder="Write summary of your desctiption here"
                    color="black"
                    _placeholder={{ color: '#8C8C8C' }}
                    fontSize={14}
                    bg="#FAFAFA"
                  />
                </Box>

                <FormLabel fontWeight="semibold" fontSize={14}>
                  Description of event/Celebrant
                </FormLabel>
                <Box
                  w="500px"
                  h="300px"
                  display="flex"
                  flex={1}
                  flexDirection="column"
                  height="100%"
                >
                  <ReactQuill
                    theme="snow"
                    dangerouslySetInnerHTML={{ __html: description }}
                    onChange={setDescription}
                    value={description}
                    modules={modules}
                    style={{ height: '240px', borderRadius: '12px' }}
                  />
                </Box>
              </Box>
            </FormControl>
          </Box>
        </Flex>
      </Box>
      <FormFooter action={handleSubmit} step={step} />
    </>
  );
};

export default EventImageForm;
