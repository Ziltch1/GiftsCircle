import { Box } from '@chakra-ui/react'
import React from 'react'
import BackButton from './subpages/BackButton'
import FormFooter from './subpages/FormFooter'
import FormHeader from './subpages/FormHeader'
import BasicForm from './subpages/step1/BasicForm'
import Stepper from './subpages/Stepper'

const index = () => {
  return (
    <Box py='4'>
        <FormHeader />
        <Stepper />
        <Box>
            <BasicForm />
        </Box>
        <FormFooter />
    </Box>
  )
}

export default index