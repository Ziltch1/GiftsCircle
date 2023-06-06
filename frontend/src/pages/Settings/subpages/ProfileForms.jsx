import {
  Box,
  Input,
  FormControl,
  FormLabel,
  Select,
  Button,
  Flex,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { states } from '../data';
import { dispatch } from '../../../redux/store';
import { UpdateUser } from '../../../redux/features/user/service';
import {DatePicker} from 'react-widgets'

const ProfileForms = () => {
  const { user } = useSelector(state => state.user);
  const [edited, setEdited] = useState(false);
  const [firstName, setFirstName] = useState(user.firstname);
  const [lastName, setLastName] = useState(user.lastname);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [residence, setResidence] = useState(user.placeOfResidence);
  const [dateOfBirth, setDateOfBirth] = useState(user.dob);
  const [phoneNumber, setPhoneNumber] = useState(user.tel);
  const [state, setState] = useState(user.state);

  const formBody = {
    gender,
    residence,
    dob: dateOfBirth,
    state,
    tel: phoneNumber,
  };

  const FormHandler = () => {
    setEdited(false);
    dispatch(UpdateUser(formBody, user.id));
  };

  return (
    <Box w="100%" h="auto" bg="white" p={{ base: 5, md: 7 }} borderRadius={5}>
      <Flex justifyContent="space-between" flexWrap="wrap-reverse">
        <Box w="630px">
          <FormControl>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>First name</FormLabel>
                  <Input
                    type="text"
                    w="100%"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    bg="#EEEEEE"
                    border="1px solid #C6C6C6"
                    disabled={true}
                    fontSize={15}
                  />
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Gender</FormLabel>
                  <Select
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={!edited ? 'disabled' : null}
                    placeholder="Select Gender"
                    fontSize={15}
                  >
                    <option value="lagos">Male</option>
                    <option value="lagos">Female</option>
                  </Select>
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Email address</FormLabel>
                  <Input
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={true}
                    fontSize={15}
                  />
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Place of residence</FormLabel>
                  <Input
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={residence}
                    onChange={e => setResidence(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={!edited ? 'disabled' : null}
                    fontSize={15}
                  />
                </Box>
              </Box>
              <Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Last name</FormLabel>
                  <Input
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={true}
                    fontSize={15}
                  />
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Date of Birth</FormLabel>
                  <DatePicker 
                    defaultValue={new Date()}
                    valueFormat={{ day: "numeric", month: "short" }}
                    value={dateOfBirth}
                    onChange={value => setDateOfBirth(value)}
                    disabled={!edited ? 'disabled' : null}
                  />
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>Phone number</FormLabel>
                  <Input
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={!edited ? 'disabled' : null}
                    fontSize={15}
                  />
                </Box>
                <Box w={{ base: '250px', md: '300px' }} mb="5">
                  <FormLabel fontSize={14}>State of residence</FormLabel>
                  <Select
                    type="text"
                    w="100%"
                    bg="#EEEEEE"
                    value={state}
                    onChange={e => setState(e.target.value)}
                    border="1px solid #C6C6C6"
                    disabled={!edited ? 'disabled' : null}
                    placeholder="Select State"
                    fontSize={15}
                  >
                    <option>Select State...</option>
                    {states.map(ele => (
                      <option key={states.indexOf(ele)}>{ele}</option>
                    ))}
                  </Select>
                </Box>
              </Box>
            </Flex>
          </FormControl>
        </Box>
        <Box mb="5">
          {!edited ? (
            <Button
              bg="#FCFCFC"
              border="2px solid #EFEFEF"
              color="black"
              onClick={() => setEdited(true)}
              fontWeight="medium"
              fontSize={14}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              bg="#00BFB2"
              color="white"
              fontWeight="medium"
              fontSize={14}
              w="160px"
              onClick={() => FormHandler()}
            >
              Save changes
            </Button>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfileForms;
