import { Box, Input, FormControl, FormLabel, Select, Button, Flex } from '@chakra-ui/react'
import React, {useState} from 'react'

const ProfileForms = () => {
  const [edited, setEdited] = useState(false);
  const [firstName, setFirstName] = useState('Robert');
  const [lastName, setLastName] = useState('Lewandowski');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('ayanwunmiabdulroheem@gmail.com');
  const [residence, setResidence] = useState('No 102, Agbowo Ibadan.');
  const [dateOfBirth, setDateOfBirth] = useState('02/06/2022');
  const [phoneNumber, setPhoneNumber] = useState('08147401060');
  const [state, setState] = useState('Abuja');
  return (
    <Box w='100%' h='auto' bg='white' p={{base: 5, md: 7}} borderRadius={5}>
        <Flex justifyContent='space-between' flexWrap='wrap-reverse'>
              <Box w='630px'>
                <FormControl>
                    <Flex justifyContent='space-between' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>First name</FormLabel>
                                <Input type='text' w='100%' value={firstName} onChange={(e) => setFirstName(e.target.value)} bg='#EEEEEE' border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Gender</FormLabel>
                                <Select type='text' w='100%' bg='#EEEEEE' value={gender} onChange={(e) => setGender(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null}>
                                    <option value="lagos">Male</option>
                                    <option value="lagos">Female</option>
                                    <option value="lagos">Prefer not to say</option>
                                </Select>
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Email address</FormLabel>
                                  <Input type='text' w='100%' bg='#EEEEEE' value={email} onChange={(e) => setEmail(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Place of residence</FormLabel>
                                  <Input type='text' w='100%' bg='#EEEEEE' value={residence} onChange={(e) => setResidence(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                        </Box>
                        <Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Last name</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' value={lastName} onChange={(e) => setLastName(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Date of Birth</FormLabel>
                                <Input type='date' w='100%' bg='#EEEEEE' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>Phone number</FormLabel>
                                <Input type='text' w='100%' bg='#EEEEEE' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null} />
                            </Box>
                            <Box w={{base: '250px', md: '300px'}} mb='5'>
                                <FormLabel fontSize={14}>State of residence</FormLabel>
                                <Select type='text' w='100%' bg='#EEEEEE' value={state} onChange={(e) => setState(e.target.value)} border='1px solid #C6C6C6' disabled={!edited ? 'disabled' : null}>
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
                  {!edited ? <Button bg='#FCFCFC' border='2px solid #EFEFEF' color='black' onClick={() => setEdited(true)} fontWeight='medium' fontSize={14}>Edit Profile</Button> : <Button bg='#00BFB2' color='white' onClick={() => setEdited(false)} fontWeight='medium' fontSize={14} w='160px'>Save changes</Button>}
              </Box>
        </Flex>
    </Box>
  )
}

export default ProfileForms