import { Box, Text, FormLabel, FormControl, Input, Checkbox, Heading, Stack, Select } from '@chakra-ui/react'
import React from 'react'

const DeliveryDetailsForm = () => {
  return (
    <Box p='5'>
      <Heading fontSize={15} mb='5'>ADD NEW ADDRES</Heading>
      <FormControl>
        <Stack direction={{base: 'column', md: 'column', lg: 'row'}} spacing={7} justifyContent='space-between' mb='7' alignItems='center'>
          <Box w={{base: '100%', lg: '50%'}}>
            <FormLabel fontSize={14}>First Name</FormLabel>
            <Input type='text' w='100%' />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Last Name</FormLabel>
            <Input type='text' w='100%' />
          </Box>
        </Stack>

        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} spacing={7} justifyContent='space-between' mb='7' alignItems='center'>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Phone Number</FormLabel>
            <Input type='text' w='100%' />
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Additional Phone Number</FormLabel>
            <Input type='text' w='100%' />
          </Box>
        </Stack>

        <Stack direction='column' spacing={7} justifyContent='space-between' mb='7' alignItems='center'>
          <Box w='100%'>
            <FormLabel fontSize={14}>Delivery Address</FormLabel>
            <Input type='text' w='100%' />
          </Box>
          <Box w='100%'>
            <FormLabel fontSize={14}>Additional Information</FormLabel>
            <Input type='text' w='100%' />
          </Box>
        </Stack>

        <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} spacing={7} justifyContent='space-between' alignItems='center'>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>Region</FormLabel>
            <Select w='100%'>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
            </Select>
          </Box>
          <Box w={{ base: '100%', lg: '50%' }}>
            <FormLabel fontSize={14}>City</FormLabel>
            <Select w='100%'>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
              <option value="south west">South west</option>
            </Select>
          </Box>
        </Stack>
      </FormControl>
    </Box>
  )
}

export default DeliveryDetailsForm