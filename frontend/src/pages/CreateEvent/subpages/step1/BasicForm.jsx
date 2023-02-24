import { Flex, Box, Input, FormControl, FormLabel, Heading, Text, Select, Button } from '@chakra-ui/react'
import React, {useState} from 'react'
import BackButton from '../BackButton'
import TimezoneSelect from 'react-timezone-select'
import HostModal from './HostModal'


const BasicForm = () => {
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [openModal, setOpenModal] = useState(false);

    const showModal = () => {
        setOpenModal(true);
    }

  return (
    <Box h='100%' overflow='auto' mb='12' w='750px' mx='auto'>
        <Flex alignItems='start' justifyContent='space-between'>
            <BackButton />
            <Box w='500px' mx='auto' fontSize={13}>
                <Box mb='6'>
                    <Heading fontWeight='bold' fontSize='25px' mb='3'>Add basic info</Heading>
                    <Text color='#717171'>Name your event and tell event-goers why they should come. Add details that highlight what makes it unique.</Text>
                </Box>
                <FormControl>
                    <Box mb='5'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Event title</FormLabel>
                        <Input type='text' placeholder='Enter the name of the event' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                    </Box>

                    <Box mb='3'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Who is hosting the event?</FormLabel>
                        <Input type='text' placeholder='Enter the name of the event' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                        <Text fontWeight='semibold' fontSize={11}>Have more than one host?<Button bg='none' _hover={{bg: 'none'}} color='#4ae' fontSize={11} onClick={showModal}>Add multiple hosts</Button></Text>
                    </Box>

                    <Box mb='8'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Event category</FormLabel>
                        <Select type='text' placeholder='Select your category' fontSize={11} bg='#FAFAFA' color='#8C8C8C'>
                            <option value="gfgffgf">ytyuiisjsnxn</option>
                            <option value="gfgffgf">ytyuiisjsnxn</option>
                            <option value="gfgffgf">ytyuiisjsnxn</option>
                            <option value="gfgffgf">ytyuiisjsnxn</option>
                        </Select>
                    </Box>

                    <Box mb='6'>
                        <Heading fontWeight='bold' fontSize='25px' mb='3'>Location</Heading>
                        <Text color='#717171'>Allow attendees know where the event is taking place</Text>
                    </Box>

                    <Box mb='8'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Event venue for your event</FormLabel>
                        <Input type='text' placeholder='e.g 26, Beside Mouka foam, Mokola, Ibadan' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                    </Box>

                    <Box mb='6'>
                        <Heading fontWeight='bold' fontSize='25px' mb='3'>Date and time</Heading>
                        <Text color='#717171'>Tell event-goers when your event starts and ends so they can make plans to attend.</Text>
                    </Box>

                    <Box mb='7'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Choose a date</FormLabel>
                        <Input type='date' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                    </Box>

                    <Box mb='5'>
                        <FormLabel fontWeight='semibold' fontSize={13.5} mb='5'>Choose time</FormLabel>
                        <Flex justifyContent='space-between'>
                            <Box w='240px'>
                                <FormLabel fontWeight='medium' fontSize={13.5}>Start time</FormLabel>
                                <Input type='time' placeholder='Start time' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                            </Box>
                            <Box w='240px'>
                                <FormLabel fontWeight='medium' fontSize={13.5}>End time</FormLabel>
                                <Input type='time' placeholder='Start time' fontSize={11} bg='#FAFAFA' color='#8C8C8C' />
                            </Box>
                        </Flex>
                    </Box>

                    <Box mb='8'>
                        <FormLabel fontWeight='semibold' fontSize={13.5}>Choose timezone</FormLabel>
                        <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                        />
                    </Box>
                    
                </FormControl>
            </Box>
        </Flex>
          {openModal && <HostModal setOpenModal={setOpenModal} />} 
    </Box>
  )
}

export default BasicForm