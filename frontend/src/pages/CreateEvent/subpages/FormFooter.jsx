import { Box, Button } from '@chakra-ui/react'
import React from 'react'

const FormFooter = () => {
  return (
    <Box borderTop='1px solid lightgray' py='3' h='65px' position='fixed' bottom='0' w='100%'>
        <Box textAlign='right' mr='5'>
            <Button mr='5' fontSize={12} fontWeight='semibold' bg='#EEEEEE'>Discard</Button>
            <Button bg='#00BFB2' fontSize={12} fontWeight='semibold' color='white'>Save and continue</Button>
        </Box>
    </Box>
  )
}

export default FormFooter