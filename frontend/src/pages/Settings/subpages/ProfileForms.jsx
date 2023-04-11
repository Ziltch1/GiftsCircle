import { Box, Input, FormControl, FormLabel, Select, Button, Flex } from '@chakra-ui/react'
import React, {useState} from 'react'

const ProfileForms = () => {
  const [edited, setEdited] = useState(true)
  return (
    <Box w='100%' h='auto' bg='white' p={{base: 5, md: 7}} borderRadius={5}>
        <Flex justifyContent='space-between' flexWrap='wrap-reverse'>
              <Box w='630px'>
                <FormControl>
                    <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>First name</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='Robert' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Gender</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='Robert' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Email address</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='ayanwumi101@gmail.com' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Place of residence</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='ayanwumi101@gmail.com' border='1px solid #C6C6C6' disabled />
                            </Box>
                        </Box>
                        <Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Last name</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='Robert' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Date of Birth</FormLabel>
                                <Input type='date' w='100%' bg='#EEEEEE' placeholder='Robert' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Phone number</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' placeholder='ayanwumi101@gmail.com' border='1px solid #C6C6C6' disabled />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>State of residence</FormLabel>
                                <Select type='text' w='100%' bg='#EEEEEE' placeholder='ayanwumi101@gmail.com' border='1px solid #C6C6C6' disabled>
                                    <option value="lagos">Lagos</option>
                                    <option value="lagos">Lagos</option>
                                    <option value="lagos">Lagos</option>
                                    <option value="lagos">Lagos</option>
                                </Select>
                            </Box>
                        </Box>
                    </Flex>
                </FormControl>
              </Box>
              <Box mb='5'>
                  {!edited ? <Button bg='#FCFCFC' border='2px solid #EFEFEF' color='black' fontWeight='medium' fontSize={14}>Edit Profile</Button> : <Button bg='#00BFB2' color='white' fontWeight='medium' fontSize={14} w='160px'>Save changes</Button>}
              </Box>
        </Flex>
    </Box>
  )
}

export default ProfileForms