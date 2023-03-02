import { Box, Input, FormLabel, Text, Heading, Flex, FormControl, Image, Textarea, Progress } from '@chakra-ui/react'
import React, {useState} from 'react'
import BackButton from '../BackButton'
import galleryImage from '../../../../components/assets/gallery.svg'
import FormFooter from '../FormFooter'
import { useSelector } from 'react-redux';
import { CreateEventApi2 } from '../../../../redux/axios/apis/events';
import { dispatch } from '../../../../redux/store';
import { setNewEvent } from '../../../../redux/features/events/eventSlice';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';

const EventImageForm = ({step, setStep}) => {
  const { newEvent } = useSelector(state => state.event);
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async () => {
    const formBody = {
      image,
      summary,
      desc_summary: description,
      id: newEvent.id,
    };

    try {
      const res = await CreateEventApi2(formBody);
      localStorage.setItem('newEvent', JSON.stringify(res.data));
      dispatch(setNewEvent(res.data));
      setStep(step + 1);
    } catch (error) {
      dispatch(createResponse(ErrorHandler(error)));
    }
  }


  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        setProgress(progress);
      }
      setUploading(true)
    };

    reader.readAsDataURL(file);
    setImage(e.target.files[0])
  }

  return (
    
      <Box mt="8" h="100%" overflow="auto" mb="20" maxW="750px" mx="auto">
        <Flex alignItems="start" justifyContent="space-between" flexWrap="wrap">
          <BackButton onClick={() => setStep(step - 1)} />
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
            <Box mb='8'>
              <FormLabel htmlFor='upload' w='500px' position='relative' h='260px' bg='#FAFAFA' border='1.5px solid lightgray' borderRadius={5} display='flex' justifyContent='center' alignItems='center'>
                <Input type='file' id='upload' display='none' onChange={uploadImage} />
                <Box>

                  <Box w='318px' mx='auto' display='flex' justifyContent='center' alignItems='center' mb='5'>
                    <Box>
                      <Image src={galleryImage} alt='event image' display='block' mx='auto' />
                      <Text fontWeight='semibold' fontSize={13}>
                        Drag and drop your file here or <strong style={{ color: '#00BFB2' }}>browse.</strong><br />
                        Maximum of 25mb
                      </Text> 
                    </Box>
                  </Box>

                  <Text fontSize={13} textAlign='center'>Uploading your file... {progress}%</Text>
                  <Progress width='500px' height='4px' value={progress} position='absolute' bottom='0' left='0px' colorScheme='teal' />
                </Box>
              </FormLabel>

             <Box mb='7'>
              <FormLabel fontWeight='semibold' fontSize={14}>Summary of event</FormLabel>
              <Input type='text' value={summary} onChnage={(e) => setSummary(e.target.value)} placeholder='Write summary of your desctiption here' color='black' _placeholder={{color: '#8C8C8C'}} fontSize={14} bg='#FAFAFA' />
             </Box>

              <FormLabel fontWeight='semibold' fontSize={14}>Description of event/Celebrant</FormLabel>
              <Textarea h='200px' value={description} onChange={(e) => setDescription(e.target.value)} resize='none' bg='#FAFAFA' placeholder='Write about your event here' fontSize={14} />
            </Box>
          </FormControl>
        </Box>
      </Flex>
      <FormFooter action={handleSubmit} step={step} />
    </Box>
  )
}

export default EventImageForm
