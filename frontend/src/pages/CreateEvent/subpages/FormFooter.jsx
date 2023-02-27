import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const FormFooter = ({step, setStep}) => {
  const navigate = useNavigate();
  const nextStep = () => {
    setStep(step + 1);
  }

  const goBack = () => {
    navigate('/dashboard')
  }

  return (
    <Box borderTop='1px solid lightgray' bgColor="#fff" py='3' h='65px' position='fixed' bottom='0' w='100%'>
        <Box textAlign='right' mr='5'>
            <Button mr='5' fontSize={12} fontWeight='semibold' bg='#EEEEEE' onClick={goBack}>Discard</Button>
            <Button bg='#00BFB2' fontSize={12} fontWeight='semibold' color='white' onClick={nextStep}>{step === 5 ? 'Finish' : 'Save and continue'}</Button>
        </Box>
    </Box>
  )
}

export default FormFooter