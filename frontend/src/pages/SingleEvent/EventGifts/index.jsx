import React from 'react'
import GiftHeader from './subpages/GiftHeader'
import GiftLists from './subpages/GiftLists'
import {Box} from '@chakra-ui/react'

const index = () => {
  return (
    <Box>
        <GiftHeader />
        <GiftLists />
    </Box>
  )
}

export default index