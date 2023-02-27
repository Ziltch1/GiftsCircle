import { Box } from '@chakra-ui/react'
import React, {useState} from 'react'

const Stepper = ({step}) => {
  const [level, setLevel] = useState(step);
  const currentStep = step * 20;
  return (
    <Box w='100%' bg='lightgray' h='1.5px'>
        <Box w={`${currentStep}%`} bg='#00BFB2' h='1.5px'></Box>
    </Box>
  )
}

export default Stepper