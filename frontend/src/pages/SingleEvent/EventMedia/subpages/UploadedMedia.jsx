import React, { useEffect, useState } from 'react';
import { Box, Text, Heading, Flex, FormLabel, VStack } from '@chakra-ui/react';
import LoadingModal from '../../components/LoadingModal';
import axiosInstance from '../../../../redux/axios/axios';
import { useSelector } from 'react-redux';
import { UploadVideoApi } from '../../../../redux/axios/apis/media';
import { dispatch } from '../../../../redux/store';
import { GetEventMediaFiles } from '../../../../redux/features/events/service';
import Card from '../../components/CardItem';

const UploadedMedia = () => {
  const { newEvent, eventMediaFiles } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [image, setImage] = useState(null);
  const [modalOpen, setShowModal] = useState(false);
  const [data, setData] = useState([]);

  const handleChange = async data => {
    const formData = new FormData();
    formData.append('image', data);
    const result = await axiosInstance.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return result.data;
  };

  const func = async () => {
    try {
      let res = await handleChange(image[0]);
      if (res) {
        setShowModal(false);
        setImage(null);
        const formBody = {
          userId: user.id,
          eventId: newEvent.id,
          uploadedBy: 'HOST',
          files: res,
        };

        const response = await UploadVideoApi(formBody);
        if (response) {
          dispatch(GetEventMediaFiles(newEvent.id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (image) {
      setShowModal(true);
      if (
        image.length === 1 &&
        (image[0].type.includes('video') || image[0].type.includes('audio'))
      ) {
        func();
      }
    }
  }, [image]);

  useEffect(() => {
    if (eventMediaFiles) {
      if (eventMediaFiles.length > 0) {
        let mediaList = [];
        eventMediaFiles.forEach(ele => {
          ele.data.forEach(i => {
            console.log(i, data, !data.includes(i.url));
            if (!data.includes(i.url)) {
              mediaList.push(i.url);
            }
          });
        });
        setData(mediaList);
      }
    }
  }, [eventMediaFiles])

  return (
    <Box
      w="100%"
      minH="600px"
      bg="white"
      borderRadius={10}
      boxShadow="md"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <LoadingModal setShowModal={setShowModal} open={modalOpen} />
      {eventMediaFiles.length > 0 ? (
        <Flex alignItems="center" gap="24px" flexWrap="wrap">
          {data.map(ele => (
            <Card item={ele} key={data.indexOf(ele)} />
          ))}
        </Flex>
      ) : (
        <VStack spacing={6} textAlign="center" w="450px" mx="auto">
          <Heading fontWeight="semibold" fontSize={30}>
            Media Empty
          </Heading>
          <Text fontSize={14} color="#8C8C8C">
            Your media is currently empty, share videos and images of the event
            to your guest list here
          </Text>

          <FormLabel
            htmlFor="upload"
            w="200px"
            mx="auto"
            color="white"
            bg="#00BFB2"
            fontSize={14}
            borderRadius="5px"
            px="28px"
            py="11px"
            textAlign="center"
          >
            Upload file
            <input
              type="file"
              id="upload"
              // // style={{ display: 'none' }}
              // value={image}
              multiple={true}
              onChange={e => setImage(e.target.files)}
            />
          </FormLabel>
        </VStack>
      )}
    </Box>
  );
};

export default UploadedMedia;
