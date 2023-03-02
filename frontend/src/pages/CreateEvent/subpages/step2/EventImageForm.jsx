import { Box, Input, FormLabel, Text, Heading, Flex, FormControl, Image, Textarea, Progress } from '@chakra-ui/react'
import React, {useState} from 'react'
import BackButton from '../BackButton'
import galleryImage from '../../../../components/assets/gallery.svg'
import FormFooter from '../FormFooter'

const EventImageForm = ({step}) => {
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const handleSubmit = () => {

  }

  // const xhr = new XMLHttpRequest();
  // const formData = new FormData();

  // // Add the file to the form data
  // formData.append('file', file);

  // xhr.open('POST', '/upload');
  // xhr.upload.addEventListener('progress', (event) => {
  //   // Calculate the progress percentage
  //   const progress = (event.loaded / event.total) * 100;
  //   console.log(`File upload progress: ${progress}%`);
  // });
  // xhr.send(formData);


  const uploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target.result;
      const totalSize = result.length;
      let loadedSize = 0;
      let progress = 0;

      const interval = setInterval(() => {
        if (loadedSize >= totalSize) {
          clearInterval(interval);
          return;
        }

        progress = Math.floor((loadedSize / totalSize) * 100);
        setProgress(progress);
        loadedSize += 1024;
      }, 50);
    };

    reader.readAsDataURL(file);

  }

  return (
    <Box mt='8' h='100%' overflow='auto' mb='20' maxW='750px' mx='auto'>
      <Flex alignItems='start' justifyContent='space-between' flexWrap='wrap'>
        <BackButton />
        <Box maxW='500px' mx='auto' fontSize={14}>

          <Box mb='5'>
            <Heading mb='2' fontSize='25px'>Event Image</Heading>
            <Text color='#717171'>This is the first image attendees will see at the top of your listing.</Text>
          </Box>

          <FormControl>
            <Box mb='8'>
              <FormLabel htmlFor='upload' w='500px' h='250px' bg='#FAFAFA' border='1.5px solid lightgray' borderRadius={5} display='flex' justifyContent='center' alignItems='center'>
                <Input type='file' id='upload' display='none' onChange={uploadImage} />
                <Box textAlign='center' w='318px'>
                  <Image src={galleryImage} alt='event image' display='block' mx='auto' />
                  <Text fontWeight='semibold' fontSize={13.5}>
                    Drag and drop your file here or <strong style={{ color: '#00BFB2'}}>browse.</strong><br />
                     Maximum of 25mb
                  </Text>
                  <Text>{progress}%</Text>
                  <Progress hasStripe value={64} />
                </Box>
              </FormLabel>
            </Box>

            <Box>
             <Box mb='5'>
                <Heading mb='2' fontSize='25px'>Description</Heading>
                <Text color='#717171'>Add more details to your event like your schedule, sponsors, or featured guest</Text>
             </Box>

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