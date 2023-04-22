import React, {useState} from 'react'
import FundraisingCard from './subpages/FundraisingCard'
import DonationHistory from './subpages/DonationHistory'
import { Box } from '@chakra-ui/react'
import CancelModal from './subpages/CancelModal'

const Index = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Box>
      {openModal && <CancelModal setOpenModal={setOpenModal} />}
      <FundraisingCard openModal={openModal} setOpenModal={setOpenModal} />
      <DonationHistory openModal={openModal} setOpenModal={setOpenModal} />
    </Box>
  )
}

export default Index