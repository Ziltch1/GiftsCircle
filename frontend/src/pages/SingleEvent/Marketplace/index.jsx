import React, {useState} from 'react'
import MarketplaceHeader from './subpages/MarketplaceHeader';
import { Box } from '@chakra-ui/react'
import Asoebi from './subpages/Asoebi';
import Sourvenirs from './subpages/Sourvenirs';
import Gifts from './subpages/Gifts';

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  return (
    <Box>
      <MarketplaceHeader navPosition={navPosition} setNavPosition={setNavPosition} />
      <Box>
        {navPosition === 0 && <Asoebi />}
        {navPosition === 1 && <Gifts />}
        {navPosition === 2 && <Sourvenirs />}
      </Box>
    </Box>
  )
}

export default Index