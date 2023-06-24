 import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const PreviewHeader = ({setStep}) => {
    const navigate = useNavigate()
    console.log(setStep);
    const backButton = () => {
        navigate('/create_event');
        setStep(4);
    }
  return (
    <Box borderBottom='1.5px solid lightgray'>
          <Box w="88%" py='4' mx="auto">
              <Flex justifyContent="space-between" alignItems="center">
                  <Box>
                      <Flex alignItems="center" gap={6}>
                          <CloseIcon
                              fontSize={10}
                              onClick={() => setStep(4)}
                              cursor="pointer"
                          />
                          <Heading fontWeight="medium" fontSize="18px">
                              Event preview
                          </Heading>
                      </Flex>
                  </Box>
                  <Box fontSize={14} onClick={backButton} cursor='pointer'><Text color= '#00BFB2'>Close preview</Text></Box> 
              </Flex>
          </Box>
    </Box>
  )
}

export default PreviewHeader