import { Box, Heading, Text, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import React, {useState} from 'react'

const Join = () => {
    const [guestCode, setGuestCode] = useState('');
    const toast = useToast();

    const handleClick = () => {   
        if(guestCode === ''){
            toast({
                title: "Error!",
                description: "Please enter a guest code",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
        }else{

        }
    }
  return (
    <Box w={{base: '350px', md: '500px', lg: '500px'}} mx='auto' h='auto'>
        <Heading textAlign='center' mb='6' fontWeight='medium' fontSize={25}>Join Abdullah's Event</Heading>
        <FormControl>
            <Box mb='5'>
                <FormLabel>Enter Guest Code</FormLabel>
                <Input placeholder="Please enter the guest code" bg='#F4F4F4' fontSize={14} _placeholder={{ color: '#A8A8A8'}} value={guestCode} onChange={(e) => setGuestCode(e.target.value)} />
            </Box>
            <Text fontSize={14} mb='5' fontWeight='medium'>By clicking "Join", you agree to our Terms of Services and Privacy Statement</Text>
            <Box textAlign='center'>
                <Button w='100%' bg='#00BFB2' fontWeight='medium' fontSize={14} color='white' onClick={handleClick}>Join now</Button>
            </Box>
        </FormControl>
    </Box>
  )
}

export default Join