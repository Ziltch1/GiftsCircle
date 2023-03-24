import React, {useState} from 'react'
import {Box, Text, Heading, Input, FormLabel, VStack} from '@chakra-ui/react'
import axios from 'axios'

const UploadedMedia = () => {
  const [image, setImage] = useState()
  const [imageName, setImageName] = useState('')

  const handleChange = async () => {
    const formData = new FormData()
    formData.append("image", image)
    const result = await axios.post('/api/image', formData, {headers: { 'Content-Type': 'multipart/form-data' }})
    setImageName(result.data.imageName)
  }

  if(image){
    handleChange()
  }

  return (
    <Box w='100%' minH='600px' bg='white' borderRadius={10} boxShadow='md' display='flex' justifyContent='center' alignItems='center'>
      <VStack spacing={6} textAlign='center' w='450px' mx='auto'>

        <Heading fontWeight='semibold' fontSize={30}>Media Empty</Heading>
        <Text fontSize={14} color='#8C8C8C'>Your media is currently empty, share videos and images of the event to your guest list here</Text>

        <FormLabel htmlFor='upload' w='200px' mx='auto' color='white' bg='#00BFB2' fontSize={14} borderRadius='5px' px='28px' py='11px' textAlign='center'>
          Upload file
          <Input type='file' id='upload' display='none' onchange={(e) => setImage(e.target.files[0])}  />
        </FormLabel>

      </VStack>
    </Box>
  )
}

export default UploadedMedia 