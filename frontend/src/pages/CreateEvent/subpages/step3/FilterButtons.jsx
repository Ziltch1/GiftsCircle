import { Button, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import FilterSidebar from './subpages/FilterSidebar'

const FilterButtons = () => {
  const buttons = ['Wedding', 'Birthday', 'Gadgets', 'Kitchen', 'Graduation', 'Baby products', 'Retirement', 'Induction', 'Clothing']
  return (
    <Box mb='7'>
      <HStack spacing={3}>
        <FilterSidebar />
        {buttons.map((btn) => 
        <Button fontWeight='semibold' fontSize='12px' w='120px' bg='none' border='1.5px solid gray' _hover={{ bg: '#00BFB2', color: 'white', border: '1px solid #00BFB2', boxShadow: '0px 8px 30px rgba(0, 191, 178, 0.1)'}}>
          {btn}
        </Button>)}
      </HStack>
    </Box>
  )
}

export default FilterButtons