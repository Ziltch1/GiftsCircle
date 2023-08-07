import { Box } from '@chakra-ui/react'
import React from 'react'
import Header from '../../../../components/Header/Header'
import PreviewHeader from './PreviewHeader'
import SingleEvent from './SingleEvent'

const index = ({setStep}) => {
  return (
    <Box>
        {/* <Header /> */}
        <PreviewHeader setStep={setStep} />
        <SingleEvent />
    </Box>
  )
}

export default index