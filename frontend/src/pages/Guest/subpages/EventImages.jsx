import React from 'react'
import { Box, Image, Text, Heading, Flex, Button } from '@chakra-ui/react'
// import copyIcon from '../../components/assets/copy.svg'
// import facebook from '../../components/assets/facebook.svg'
// import instagram from '../../components/assets/instagram.svg'
// import whatsapp from '../../components/assets/whatsapp.svg'
// import linkedin from '../../components/assets/linkedin.svg'
// import twitter from '../../components/assets/twitter.svg'
import defaultImage from '../../../components/assets/default-image.svg'
import BackButton from '../../CreateEvent/subpages/BackButton'

const EventImages = ({newEvent}) => {
    const image = newEvent?.image;
    const imageUrl = image
  return (
    <>
      <Box mb = '6' mt='5'>
            <Flex justifyContent={'space-between'} alignItems='center'>
                <Box bg='#EEEEEE' w='100%' h='380px' borderRadius={5} display='flex' alignItems={'center'} justifyContent='center' boxShadow={'sm'}>
                  {newEvent?.image ? <Image src={imageUrl} w='100%' h='100%' objectFit='cover' borderRadius={5} /> : <Image src={defaultImage} />}
                </Box>
            </Flex>
      </Box >
    </>
  )
}

export default EventImages